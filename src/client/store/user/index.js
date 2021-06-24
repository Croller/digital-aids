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
  },
  roles: null,
  dictionary: null,
  position: 'guest',

  loading: false,
  status: null,
  error: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case Constants.USER_SET:
      return { ...state, ...action.payload };
    case Constants.USER_ERROR_SET:
      return { ...state, error: action.payload, loading: false };
    case Constants.USER_LOADING_SET:
      return { ...state, loading: action.payload, error: null };
    default:
      return state;
  }
}

export function set(payload) {
  return {
    type: Constants.USER_SET_STATE,
    payload,
  };
}

export function update(payload) {
  return {
    type: Constants.USER_UPDATE,
    payload,
  };
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

export function registration(payload) {
  return {
    type: Constants.USER_REGISTRATION,
    payload,
  };
}

export function reset(payload) {
  return {
    type: Constants.USER_RESET_PASSWORD,
    payload,
  };
}

export function error(payload) {
  return {
    type: Constants.USER_ERROR_SET,
    payload,
  };
}
