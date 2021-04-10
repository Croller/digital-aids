import {
  takeLatest,
  put,
  select,
  take,
} from 'redux-saga/effects';
import * as Constants from 'client/store/backOffice/constants';
import * as commonProvider from 'client/providers/common';

function* updateRestaurants({ payload }) {
  const { token } = yield select((store) => store.user.info);
  const table = yield select((store) => store.backOffice[payload.name.split('_')[1]]);
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  try {
    const results = yield commonProvider.update({ ...payload, token });
    if (results.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: results.error });
    } else if (results) {
      let list = [...(table || []), results];
      let status = 'created';
      if (payload.data.id) {
        list = !table ? [results] : table.map((item) => {
          if (item.id === payload.data.id) {
            return results;
          }
          return item;
        });
        status = 'saved';
      }
      yield put({
        type: Constants.BO_SET,
        payload: {
          [payload.name.split('_')[1]]: list,
          status,
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
    'dictionary_language',
  ];
  if (roles.includes(1)) {
    names.push('data_restaurants');
  }

  try {
    const results = yield commonProvider.loadTables({ names, token });
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
    const results = yield commonProvider.loadRows({ name, token: info.token, ids: arr });
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

function* deleteFile({ payload }) {
  const token = yield select((store) => store.user.info.token);
  try {
    yield commonProvider.deleteFile({ ...payload, token });
  } catch (err) {
    throw err;
  }
}

export function* watchBOupdate() {
  yield takeLatest(Constants.BO_CREATE, updateRestaurants);
}

export function* watchBOdeleteFile() {
  yield takeLatest(Constants.BO_DELETE_FILE, deleteFile);
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

    if (payload && type === 'USER_SET' && payload.token && payload.roles) {
      if ([2, 3].some(s => payload.roles.includes(s))) {
        yield put({ type: Constants.BO_LOAD_ITEMS, payload: { name: 'data_restaurants', ids: payload.restaurants } });
      }
      yield put({ type: Constants.BO_LOAD, payload: null });
    } 
  }
}
