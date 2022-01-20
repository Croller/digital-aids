import * as Constants from './constants';

const initState = {
  user: {
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

  loading: false,
  status: null,
  error: null,
};

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Constants.USER_SET:
      return { ...state, ...payload };
    case Constants.USER_SET_ERROR:
      return { ...state, error: payload, loading: false };
    case Constants.USER_SET_LOADING:
      return {
        ...state,
        loading: payload,
        error: null,
        status: null,
      };
    default:
      return state;
  }
};

export const set = (payload) => ({
  type: Constants.USER_SET,
  payload,
});

export const update = (payload) => ({
  type: Constants.USER_UPDATE,
  payload,
});

export const login = (payload) => ({
  type: Constants.USER_SIGNIN,
  payload,
});

export const auth = (payload) => ({
  type: Constants.USER_AUTH,
  payload,
});

export const reg = (payload) => ({
  type: Constants.USER_SIGNUP,
  payload,
});

export const reset = (payload) => ({
  type: Constants.USER_RESET_PASSWORD,
  payload,
});

export const error = (payload) => ({
  type: Constants.USER_SET_ERROR,
  payload,
});
