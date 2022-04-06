import {
  takeLatest,
  put,
  select,
  take,
} from 'redux-saga/effects';
import * as Constants from 'client/store/backOffice/constants';
import * as commonProvider from 'client/providers/common';
import { getAccess, getSort, updateItem } from 'client/utils/common';
import { categoryModel } from 'client/store/backOffice/mapper/category';

function* updateState({ payload }) {
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  try {
    yield put({ type: Constants.BO_SET, payload });
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.BO_LOADING_SET, payload: false });
}

function* init({ payload }) {
  const { name = 'data_restaurants', id } = payload;
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  const { backOffice, user: { roles, info: { token, language } } } = yield select((store) => store);
  const ids = roles.filter(f => f.project_id).map(role => role.project_id) || null;

  try {
    const dictionaries = [
      'dictionary_currency',
      'dictionary_languages',
      'dictionary_days',
      'dictionary_units',
      'dictionary_allergens',
    ];

    let results_restaurants = [];
    let results_categories = [];
    let results_dishes = [];
    let results_dictionary = backOffice.dictionary;
    results_dictionary = yield commonProvider.getTables({
      token,
      language,
      data: dictionaries,
    });
    results_dictionary = Object.keys(results_dictionary).reduce((obj, key) => ({ ...obj, [key.split('_')[1]]: results_dictionary[key] }), {});

    if (ids && ids.length > 0) {
      results_restaurants = yield commonProvider.getRecordById({
        name,
        token,
        language,
        data: ids,
      });
    }

    if (results_restaurants.length > 0) {
      results_restaurants = backOffice.restaurants ? updateItem(backOffice.restaurants, results_restaurants) : results_restaurants;
      results_categories = yield commonProvider.getRecordByParam({
        name: 'data_categories',
        token,
        language: payload.language || language,
        data: { restaurant: id },
      });
    
      results_dishes = yield commonProvider.getRecordByParam({
        name: 'data_dishes',
        token,
        language: payload.language || language,
        data: { restaurant: id },
      });
    }
    const error = null;
    
    if (error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: error.error });
    } else if (results_dictionary && results_restaurants && results_categories && results_dishes) {
      yield put({
        type: Constants.BO_SET,
        payload: {
          restaurants: results_restaurants,
          dishes: results_dishes,
          dictionary: results_dictionary,
          categories: results_categories,
        },
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.BO_LOADING_SET, payload: false });
}

function* updateRow({ payload }) {
  const { name, data } = payload;
  const { token } = yield select((store) => store.user.info);
  const table = yield select((store) => store.backOffice[name.split('_')[1]]);
  const status = data.id ? 'saved' : 'created';
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  try {
    const results = yield commonProvider.updateRecord({ ...payload, token }); 
    if (results.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: results.error });
    } else if (results) {
      const arr = updateItem(results, table);

      yield put({
        type: Constants.BO_SET,
        payload: {
          [name.split('_')[1]]: arr.filter(f => !f.is_deleted),
          status,
        }, 
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.BO_LOADING_SET, payload: false });
}

function* loadTables({ payload }) {
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  const { names } = payload;
  const { token, language } = yield select((store) => store.user.info);

  try {
    const results = yield commonProvider.getTables({ token, language, data: names });
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
        }, {}), 
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.BO_LOADING_SET, payload: false });
}

function* loadTableRows({ payload: { name, data } }) {
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  const { token, language } = yield select((store) => store.user.info);
  try {
    const results = yield commonProvider.getRecordByParam({
      name,
      token,
      language,
      data,
    });
    if (results.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: results.error });
    } else if (results) {
      const table = name.split('_')[1];
      yield put({
        type: Constants.BO_SET,
        payload: { [table]: results },
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

export function* watchBOloadInit() {
  yield takeLatest(Constants.BO_LOAD_INIT, init);
}

export function* watchBOupdateState() {
  yield takeLatest(Constants.BO_SET_STATE, updateState);
}

export function* watchBOupdate() {
  yield takeLatest(Constants.BO_UPDATE, updateRow);
}

export function* watchBOdeleteFile() {
  yield takeLatest(Constants.BO_DELETE_FILE, deleteFiles);
}

export function* watchBOloadItems() {
  yield takeLatest(Constants.BO_LOAD_ITEMS, loadTableRows);
}

export function* watchBOloadTables() {
  yield takeLatest(Constants.BO_LOAD_TABLES, loadTables);
}

export function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const { type, payload } = action;

    if (payload && payload.info && type === 'USER_SET') {
      const { info: { token }, roles } = payload;
      let ids = null;
      if (roles && token) {
        if (!getAccess({ role: 'root', roles })) {
          ids = roles.map(m => m.project_id).filter((f) => f);
        }
        yield put({ type: Constants.BO_LOAD_INIT, payload: { ids } });
      }
    } 
  }
}
