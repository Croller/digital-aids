import {
  USER_LOGIN,
  // USER_LOGOUT,
} from './constants';

const initState = {
  id: 213123,
  name: 'las-cuevas',
  address: null,
  geo: null,
  phone: null,
  workTime: null,
  avgPrice: null,
  raiting: null,
  typeFood: null,
  
  categories: null,
  dishes: null,

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
