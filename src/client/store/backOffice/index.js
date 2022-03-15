import * as Constants from './constants';

const initState = {
  restaurants: null,
  categories: null,
  dishes: null,
  reserve: null,
  opinions: null,
  orders: null,
  notify: null,
  users: null,
  dictionary: null,

  alert: {
    reserve: false,
    opinions: false,
    orders: false,
    notify: false,
  },

  loading: false,
  status: null,
  error: null,
};

export default function (state = initState, { type, payload }) {
  switch (type) {
    case Constants.BO_SET:
      return { ...state, ...payload };
    case Constants.BO_ERROR_SET:
      return { ...state, error: payload, loading: false };
    case Constants.BO_LOADING_SET:
      return {
        ...state,
        loading: payload,
        error: null,
        status: null,
      };
    default:
      return state;
  }
}

export function init(payload) {
  return {
    type: Constants.BO_LOAD_INIT,
    payload,
  };
}

export function set(payload) {
  return {
    type: Constants.BO_SET_STATE,
    payload,
  };
}

export function update(payload) {
  return {
    type: Constants.BO_UPDATE,
    payload,
  };
}

export function loadItems(payload) {
  return {
    type: Constants.BO_LOAD_ITEMS,
    payload,
  };
}

export function loadTables(payload) {
  return {
    type: Constants.BO_LOAD_TABLES,
    payload,
  };
}

export function deleteFiles(payload) {
  return {
    type: Constants.BO_DELETE_FILE,
    payload,
  };
}
