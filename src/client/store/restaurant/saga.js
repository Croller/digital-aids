import {
  takeLatest,
  put,
  select,
} from 'redux-saga/effects';
import * as Constants from 'client/store/restaurant/constants';
import * as commonProvider from 'client/providers/common';
import { getCategoryDish, setUrlOrder } from 'client/utils/restaurant';
import { setLocalRestaurant } from 'client/utils/localStorage';

function* updateState({ payload }) {
  yield put({ type: Constants.REST_LOADING_SET, payload: true });
  try {
    yield put({ type: Constants.REST_SET, payload });
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.REST_LOADING_SET, payload: false });
}

function* init({ payload: { restaurant = null, language = 'en' } }) {
  yield put({ type: Constants.REST_LOADING_SET, payload: true });
  const store = yield select((s) => s);
  const { info } = store.user;
  const { token } = info;
  try {
    const dictionaries = [
      'dictionary_currency',
      'dictionary_languages',
      'dictionary_days',
      'dictionary_units',
      'dictionary_allergens',
    ];
    let results_dictionary = null;
    let results_restaurant = null;
    let results_categories = [];
    let results_dishes = [];
    let results_foodtips = [];
    let results_offers = [];

    results_dictionary = yield commonProvider.loadTable({
      token,
      language: language || info.language,
      data: dictionaries,
    });
    results_dictionary = Object.keys(results_dictionary).reduce((obj, key) => ({ ...obj, [key.split('_')[1]]: results_dictionary[key] }), {});

    if (restaurant.length > 0) {
      results_restaurant = yield commonProvider.loadRowByParam({
        name: 'data_restaurants',
        token,
        language: 'en',
        data: { key: restaurant, is_archived: false, is_deleted: false },
      });
    }

    if (results_restaurant.length > 0) {
      results_restaurant = { ...results_restaurant[0] };

      results_categories = yield commonProvider.loadRowByParam({
        name: 'data_categories',
        token,
        language,
        data: { restaurant: results_restaurant.id },
      });
      results_categories = results_categories.sort((a, b) => a.number - b.number);

      results_dishes = yield commonProvider.loadRowByParam({
        name: 'data_dishes',
        token,
        language,
        data: { restaurant: results_restaurant.id },
      });
      results_dishes = results_dishes.sort((a, b) => b.number - a.number);

      results_categories = [...getCategoryDish(results_categories, results_dishes)];

      results_foodtips = results_categories.find(f => f.type === 'foodtips');
      results_offers = results_categories.find(f => f.type === 'specialDeals');
      results_foodtips = results_foodtips || [];
      results_offers = results_offers ? results_offers.dishes : [];
      results_categories = results_categories.filter(f => !['foodtips', 'specialDeals'].includes(f.type));
    } else {
      results_restaurant = null;
    }

    const error = null;
    
    if (error) {
      yield put({ type: Constants.REST_ERROR_SET, payload: error.error });
    } else if (results_dictionary && results_categories && results_dishes) {
      yield put({
        type: Constants.REST_SET,
        payload: {
          info: results_restaurant,
          dishes: results_dishes,
          dictionary: results_dictionary,
          categories: results_categories,
          offers: results_offers,
          foodtips: results_foodtips,
        },
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.REST_LOADING_SET, payload: false });
}

function* updateRow({ payload }) {
  const { token } = yield select((store) => store.user.info);
  yield put({ type: Constants.REST_LOADING_SET, payload: true });
  try {
    const results = yield commonProvider.update({
      ...payload,
      token,
    }); 
    if (results.error) {
      yield put({ type: Constants.REST_ERROR_SET, payload: results.error });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.REST_LOADING_SET, payload: false });
}

function* setOrder({ payload }) {
  yield put({ type: Constants.REST_LOADING_SET, payload: true });
  const { order, info } = yield select((store) => store.restaurant);
  
  if (payload) {
    try {
      const newOrder = payload;
      const stateOrder = [...(order || [])];
      const existOrder = stateOrder.find(f => f.order_id === newOrder.order_id);
      let data = [];
      if (existOrder) {
        // update
        const filtred = stateOrder.reduce((arr, item) => {
          if (item.order_id === newOrder.order_id) {
            if (newOrder.order.length > 0) {
              return [...arr, newOrder];
            }
            return arr;
          }
          return [...arr, item];
        }, []);
        data = filtred.length === 0 ? null : filtred;
      } else {
        // add new
        data = [...stateOrder, newOrder];
      }
      // sort order, daily to top
      if (data) {
        data = [
          ...data.filter(f => f.dailymenu),
          ...data.filter(f => !f.dailymenu),
        ];
      }
      setLocalRestaurant(info.key, { order: setUrlOrder(data) });
      yield put({ type: Constants.REST_SET, payload: { order: data } });
    } catch (err) {
      throw err;
    }
  } else {
    setLocalRestaurant(info.key, { order: null });
    yield put({ type: Constants.REST_SET, payload: { order: null } });
  }
  yield put({ type: Constants.REST_LOADING_SET, payload: false });
}

export function* watchRESTupdateState() {
  yield takeLatest(Constants.REST_SET_STATE, updateState);
}

export function* watchRESTloadInit() {
  yield takeLatest(Constants.REST_LOAD_INIT, init);
}

export function* watchRESTupdateRow() {
  yield takeLatest(Constants.REST_SET_ROW, updateRow);
}

export function* watchRESTset() {
  yield takeLatest(Constants.REST_SET_ORDER, setOrder);
}
