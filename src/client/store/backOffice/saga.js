import {
  takeLatest,
  put,
  select,
  take,
} from 'redux-saga/effects';
import * as Constants from 'client/store/backOffice/constants';
import * as commonProvider from 'client/providers/common';
import { updateItem } from 'client/utils/common';
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

function* init({ payload: { name = 'data_restaurants', ids = null, language = 'en' } }) {
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  const { user: { info }, backOffice } = yield select((store) => store);
  const { token } = info;
  try {
    const dictionaries = [
      'dictionary_currency',
      'dictionary_languages',
      'dictionary_days',
      'dictionary_units',
      'dictionary_allergens',
    ];

    let results_dictionary = backOffice.dictionary;
    if (!results_dictionary) {
      results_dictionary = yield commonProvider.loadTable({
        token,
        language,
        data: dictionaries,
      });
      results_dictionary = Object.keys(results_dictionary).reduce((obj, key) => ({ ...obj, [key.split('_')[1]]: results_dictionary[key] }), {});
    }

    let results_restaurants = [];
    if (!ids) {
      results_restaurants = yield commonProvider.loadTable({ token, language, data: ['data_restaurants'] });
      results_restaurants = results_restaurants.data_restaurants.sort((a, b) => a.number - b.number);
    }
    if (ids && ids.length > 0) {
      results_restaurants = yield commonProvider.loadRow({
        name,
        token,
        language,
        data: ids,
      });
    }

    let results_categories = [];
    let results_dishes = [];

    if (results_restaurants.length > 0) {
      results_restaurants = backOffice.restaurants ? updateItem(backOffice.restaurants, results_restaurants) : results_restaurants;

      const restaurants_ids = results_restaurants.map(({ id }) => id);
      results_categories = yield commonProvider.loadRowByParam({
        name: 'data_categories',
        token,
        language,
        data: { restaurant: restaurants_ids },
      });
      results_categories = results_categories.sort((a, b) => a.number - b.number);
    
      results_dishes = yield commonProvider.loadRowByParam({
        name: 'data_dishes',
        token,
        language,
        data: { restaurant: restaurants_ids },
      });
      results_dishes = results_dishes.sort((a, b) => b.number - a.number);
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
  const { token } = yield select((store) => store.user.info);
  const { name, data, language = 'en' } = payload;
  const table = yield select((store) => store.backOffice[name.split('_')[1]]);
  let status = 'saved';
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  try {
    const results = yield commonProvider.update({
      ...payload,
      token,
      // language: ((Array.isArray(data) && data[0].id) || data.id) ? language : 'en',
    }); 
    if (results.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: results.error });
    } else if (results) {
      let arr = Array.isArray(results) ? results : [results];

      // update restaurant with create 2 default categories foodtips/special-deals
      if (name === 'data_restaurants' && !data.id) {
        status = 'created';
        yield commonProvider.update({
          name: 'data_categories',
          token,
          language,
          data: categoryModel.slice(-2).map(item => ({ ...item, restaurant: results[0].id })), 
        });
      }

      // update children parent after create new category group
      let children = arr.slice(1);
      children = children.filter(f => !f.parent && f);
      if (name === 'data_categories' && arr.length > 1 && children.length > 0) {
        status = 'created';
        const arrChild = yield commonProvider.update({
          name,
          token,
          language,
          data: children.map(child => {
            const obj = { ...child };
            delete obj.children;
            return { ...obj, parent: arr[0].id };
          }), 
        });
        arr = [arr[0], ...(Array.isArray(arrChild) ? arrChild : [arrChild])];
      }
      
      arr = updateItem(arr, table);
      arr.sort((a, b) => a.number - b.number);
      if (['data_restaurants', 'data_dishes'].includes(name)) {
        arr.sort((a, b) => b.number - a.number);
      }
      
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

function* getTables({ payload }) {
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  const { names } = payload;
  const { token, language } = yield select((store) => store.user.info);

  try {
    const results = yield commonProvider.loadTable({ token, language, data: names });
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

function* getTableRows({ payload: { name, ids = null } }) {
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  const { token, language, restaurants } = yield select((store) => store.user.info);
  const backOffice = yield select((store) => store.backOffice);
  const arr = ids || restaurants;
  try {
    const results = yield commonProvider.loadRow({
      name,
      token,
      language,
      data: arr,
    });
    if (results.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: results.error });
    } else if (results) {
      const table = name.split('_')[1];
      yield put({
        type: Constants.BO_SET,
        payload: { [table]: [...(backOffice.restaurants || []), ...results] },
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.BO_LOADING_SET, payload: false });
}

function* getTableRowsByParam({ payload: { name, data } }) {
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  const { token, language } = yield select((store) => store.user.info);
  try {
    const results = yield commonProvider.loadRowByParam({
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

export function* watchBOload() {
  yield takeLatest(Constants.BO_LOAD, getTables);
}

export function* watchBOloadItems() {
  yield takeLatest(Constants.BO_LOAD_ITEMS, getTableRows);
}

export function* watchBOloadItemsByParam() {
  yield takeLatest(Constants.BO_LOAD_ITEMS_BY_PARAM, getTableRowsByParam);
}

export function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const { type, payload } = action;
    // const { user } = yield select();

    if (payload && payload.info && type === 'USER_SET') {
      const { info: { token }, roles } = payload;
      let ids = null;
      if (roles && token) {
        const isRoot = roles.some(f => f.root || f.root_back);
        if (!isRoot) {
          ids = roles.map(m => m.restaurant).filter(f => f) || [];
        }
        yield put({ type: Constants.BO_LOAD_INIT, payload: { ids } });
      }
    } 
  }
}
