import * as Constants from './constants';

const initState = {
  info: {
    id: null,
    login: null,
    password: null,
    surname: null,
    name: null,
    middlename: null,
    birthdate: null,
    phone: null,
    email: null,
    language: null,
    roles: null,
    restaurants: null,
    token: null,
    enter_at: null,
    meta: { browser: null, ip: null, geo: null },

    lng: 'en',
    cookies: false,
  },
  orders: null, // orders users

  loading: false,
  error: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case Constants.USER_SET:
      return { ...state, info: action.payload || initState.info };
    case Constants.USER_ERROR_SET:
      return { ...state, error: action.payload, loading: false };
    case Constants.USER_LOADING_SET:
      return { ...state, loading: action.payload, error: null };
    default:
      return state;
  }
}

export function login(payload) {
  return {
    type: Constants.USER_LOGIN,
    payload,
  };
}

export function auth(payload) {
  return {
    type: Constants.USER_AUTH,
    payload,
  };
}

export function logout() {
  return {
    type: Constants.USER_LOGOUT,
    payload: null,
  };
}

export function error(payload) {
  return {
    type: Constants.USER_ERROR_SET,
    payload,
  };
}
