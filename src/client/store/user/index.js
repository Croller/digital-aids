import {
  USER_LOGIN,
  // USER_LOGOUT,
} from './constants';

const initState = {
  data: null,
  loading: false,
  errors: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...initState, fetch: false, isAuth: false };
    default:
      return state;
  }
}

export function userLogin({ login, password }) {
  return {
    type: USER_LOGIN,
    payload: { login, password },
  };
}
