import * as Constants from './constants';

const initState = {
  phone: '+7 (910) 464 30 15',
  email: 'info@digital-aids.com',

  restaurants: null,

  loading: false,
  error: null,
};

export default function (state = initState, { type, payload }) {
  switch (type) {
    case Constants.PRESENT_SET:
      return { ...state, ...payload };
    case Constants.PRESENT_ERROR_SET:
      return { ...state, error: payload, loading: false };
    case Constants.PRESENT_LOADING_SET:
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
    type: Constants.PRESENT_LOAD_INIT,
    payload,
  };
}

