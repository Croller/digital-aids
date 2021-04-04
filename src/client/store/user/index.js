import * as Constants from './constants';

const initState = {
  lng: 'en',
  
  orders: null, // orders users

  info: {
    birthdate: null,
    email: null,
    enter_at: null,
    id: null,
    login: null,
    middlename: null,
    name: null,
    phone: null,
    roles: null,
    surname: null,
    token: null,
  },

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

export function error(payload) {
  return {
    type: Constants.USER_ERROR_SET,
    payload,
  };
}
