import {
  takeLatest,
  put,
  select,
  take,
} from 'redux-saga/effects';
import * as Constants from 'client/store/backOffice/constants';
import * as commonProvider from 'client/providers/common';

function* updateRow({ payload }) {
  const { token } = yield select((store) => store.user.info);
  const { name, data } = payload;
  const table = yield select((store) => store.backOffice[name.split('_')[1]]);
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  try {
    const results = yield commonProvider.update({ ...payload, token });
    if (results.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: results.error });
    } else if (results) {
      let list = [];
      let status = 'saved';

      if (Array.isArray(data)) {
        list = table.map(row => {
          const r = results.find(f => f.id === row.id);
          return r || row;
        });
      } else {
        list = [...(table || []), results];
        if (data.id) {
          list = !table ? [results] : table.map((item) => {
            if (item.id === data.id) {
              return results;
            }
            return item;
          });
          status = 'saved';
        }
      }
      yield put({
        type: Constants.BO_SET,
        payload: {
          [name.split('_')[1]]: list,
          status,
        }, 
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.BO_LOADING_SET, payload: false });
}

function* updateRows({ payload }) {
  const { token } = yield select((store) => store.user.info);
  const { name } = payload;
  const table = yield select((store) => store.backOffice[name.split('_')[1]]);
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  try {
    const results = yield commonProvider.update({ ...payload, token });
    if (results.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: results.error });
    } else if (results) {
      const mapData = table.map(row => {
        const r = results.find(f => f.id === row.id);
        return r || row;
      });
      yield put({
        type: Constants.BO_SET,
        payload: {
          [name.split('_')[1]]: mapData,
          status: 'saved',
        }, 
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.BO_LOADING_SET, payload: false });
}

function* getTables({ payload }) {
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  const { token, roles } = yield select((store) => store.user.info);

  const names = (payload && payload.names) || [
    'dictionary_currency',
    'dictionary_languages',
    'dictionary_days',
    'dictionary_units',
    'dictionary_allergens',
    'dictionary_dictionary_languages',
    'dictionary_type_categories',
  ];
  if (roles.includes(1)) {
    names.push('data_restaurants');
  }

  try {
    const results = yield commonProvider.loadTable({ token, data: names });
    if (results.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: results.error });
    } else if (results) {
      yield put({
        type: Constants.BO_SET,
        payload: names.reduce((obj, name) => {
          const table = name.split('_')[1];
          if (name.split('_')[0] === 'data') {
            return { ...obj, [table]: results[name] };
          }
          return { ...obj, dictionary: { ...obj.dictionary, [table]: results[name] } };
        }, { dictionary: {} }), 
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.BO_LOADING_SET, payload: false });
}

function* getTableRows({ payload: { name = 'data_restaurants', ids = null } }) {
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  const info = yield select((store) => store.user.info);
  const { restaurants } = yield select((store) => store.backOffice);
  const arr = ids || info.restaurants;
  try {
    const results = yield commonProvider.loadRow({ name, token: info.token, data: arr });
    if (results.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: results.error });
    } else if (results) {
      const table = name.split('_')[1];
      yield put({
        type: Constants.BO_SET,
        payload: { [table]: [...(restaurants || []), ...results] },
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.BO_LOADING_SET, payload: false });
}

function* deleteFiles({ payload }) {
  const token = yield select((store) => store.user.info.token);
  try {
    yield commonProvider.deleteFiles({ ...payload, token });
  } catch (err) {
    throw err;
  }
}

export function* watchBOupdate() {
  yield takeLatest(Constants.BO_UPDATE, updateRow);
}

export function* watchBOupdateMany() {
  yield takeLatest(Constants.BO_UPDATE_MANY, updateRows);
}

export function* watchBOdeleteFile() {
  yield takeLatest(Constants.BO_DELETE_FILE, deleteFiles);
}

export function* watchBOload() {
  yield takeLatest(Constants.BO_LOAD, getTables);
}

export function* watchBOloadItems() {
  yield takeLatest(Constants.BO_LOAD_ITEMS, getTableRows);
}

export function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const state = yield select();
    const { type, payload } = action;
    console.log('Saga watch', action, state);

    if (payload) {
      const { token, roles } = payload;
      if (token && roles && type === 'USER_SET') {
        if ([2, 3].some(s => roles.includes(s)) && !roles.includes(1)) {
          yield put({ type: Constants.BO_LOAD_ITEMS, payload: { name: 'data_restaurants', ids: payload.restaurants } });
        }
        yield put({ type: Constants.BO_LOAD, payload: null });
      }
    } 
  }
}
