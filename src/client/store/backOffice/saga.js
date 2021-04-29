import {
  takeLatest,
  put,
  select,
  take,
} from 'redux-saga/effects';
import * as Constants from 'client/store/backOffice/constants';
import * as commonProvider from 'client/providers/common';
import { updateItem } from 'client/utils/common';

function* getTableInit({ payload: { name = 'data_restaurants', ids = null } }) {
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  const { token, language } = yield select((store) => store.user.info);

  try {
    const tables = yield commonProvider.loadTable({
      token,
      language,
      data: [
        'dictionary_currency',
        'dictionary_languages',
        'dictionary_days',
        'dictionary_units',
        'dictionary_allergens',
      ],
    });

    let results_restaurants = null;
    if (!ids) {
      results_restaurants = yield commonProvider.loadTable({ token, language, data: ['data_restaurants'] });
      results_restaurants = results_restaurants.data_restaurants;
    } else {
      results_restaurants = yield commonProvider.loadRow({
        name,
        token,
        language,
        data: ids,
      });
    }

    let results_categories = [];
    const restaurants_ids = results_restaurants.map(({ id }) => id);
    if (restaurants_ids.length > 0) {
      results_categories = yield commonProvider.loadRowByParam({
        name: 'data_categories',
        token,
        language,
        data: { restaurant: restaurants_ids },
      });
    }
    
    let results_dishes = [];
    const categories_ids = results_categories.reduce((arr, { dishes }) => [...arr, ...(dishes || [])], []);
    if (categories_ids.length > 0) {
      results_dishes = yield commonProvider.loadRowByParam({
        name: 'data_dishes',
        token,
        language,
        data: { id: results_categories.reduce((arr, { dishes }) => [...arr, ...dishes], []) },
      });
    }
    
    const error = null;
    
    if (error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: error.error });
    } else if (tables && results_restaurants && results_categories && results_dishes) {
      yield put({
        type: Constants.BO_SET,
        payload: {
          restaurants: results_restaurants,
          dishes: results_dishes,
          dictionary: Object.keys(tables).reduce((obj, key) => ({ ...obj, [key.split('_')[1]]: tables[key] }), {}),
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
  const { token, language } = yield select((store) => store.user.info);
  const { name } = payload;
  const table = yield select((store) => store.backOffice[name.split('_')[1]]);

  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  try {
    let results = yield commonProvider.update({ ...payload, token, language });
    if (results.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: results.error });
    } else if (results) {
      const status = 'saved';
      results = Array.isArray(results) ? results : [results];

      // update children parent after create new category group
      let children = results.slice(1);
      children = children.filter(f => !f.parent && f);
      if (name === 'data_categories' && results.length > 1 && children.length > 0) {
        const resultsChild = yield commonProvider.update({
          name,
          token,
          language,
          data: children.map(child => {
            const obj = { ...child };
            delete obj.children;
            return { ...obj, parent: results[0].id };
          }), 
        });
        results = [results[0], ...(Array.isArray(resultsChild) ? resultsChild : [resultsChild])];
      }
      console.log('updateItem(results, table)', results, table, updateItem(results, table));

      yield put({
        type: Constants.BO_SET,
        payload: {
          [name.split('_')[1]]: updateItem(results, table).filter(f => !f.is_deleted && f),
          status,
        }, 
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.BO_LOADING_SET, payload: false });
}

// function* updateRows({ payload }) {
//   const { token } = yield select((store) => store.user.info);
//   const { name } = payload;
//   const table = yield select((store) => store.backOffice[name.split('_')[1]]);
//   yield put({ type: Constants.BO_LOADING_SET, payload: true });
//   try {
//     const results = yield commonProvider.update({ ...payload, token });
//     if (results.error) {
//       yield put({ type: Constants.BO_ERROR_SET, payload: results.error });
//     } else if (results) {
//       const mapData = table.map(row => {
//         const r = results.find(f => f.id === row.id);
//         return r || row;
//       });
//       yield put({
//         type: Constants.BO_SET,
//         payload: {
//           [name.split('_')[1]]: mapData,
//           status: 'saved',
//         }, 
//       });
//     }
//   } catch (err) {
//     throw err;
//   }
//   yield put({ type: Constants.BO_LOADING_SET, payload: false });
// }

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

function* getTableRows({ payload: { name = 'data_restaurants', ids = null } }) {
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

function* getTableRowsByParam({ payload: { name = 'data_categories', data } }) {
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

// export function* watchBOupdateStore() {
//   yield takeLatest(Constants.BO_STORE_UPDATE, updateStore);
// }

export function* watchBOupdate() {
  yield takeLatest(Constants.BO_UPDATE, updateRow);
}

// export function* watchBOupdateMany() {
//   yield takeLatest(Constants.BO_UPDATE_MANY, updateRows);
// }

export function* watchBOdeleteFile() {
  yield takeLatest(Constants.BO_DELETE_FILE, deleteFiles);
}

export function* watchBOload() {
  yield takeLatest(Constants.BO_LOAD, getTables);
}

export function* watchBOloadInit() {
  yield takeLatest(Constants.BO_LOAD_INIT, getTableInit);
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
    const state = yield select();
    const { type, payload } = action;
    console.log('Saga watch', action, state);

    if (payload) {
      const { token, roles } = payload;
      if (token && roles && type === 'USER_SET') {
        let ids = null;
        if ([2, 3].some(s => roles.includes(s)) && !roles.includes(1)) {
          ids = payload.restaurants;
        }
        yield put({ type: Constants.BO_LOAD_INIT, payload: { ids } });
      }
    } 
  }
}
