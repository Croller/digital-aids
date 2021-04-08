import * as Constants from './constants';

const initState = {
  restaurants: null,
  categories: null,
  dishes: null,
  offers: null,
  foodtips: null,
  specialDeals: null,

  loading: false,
  error: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case Constants.BO_SET:
      return { ...state, ...action.payload };
    case Constants.BO_ERROR_SET:
      return { ...state, error: action.payload, loading: false };
    case Constants.BO_LOADING_SET:
      return { ...state, loading: action.payload, error: null };
    default:
      return state;
  }
}

export function create(payload) {
  return {
    type: Constants.BO_CREATE,
    payload,
  };
}
