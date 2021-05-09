import * as Constants from './constants';

const initState = {
  info: {
    number: 1,
    // id: null, // string
    key: null, // string
    name: null, // string
    address: null, // string
    email: null, // array string
    website: null, // string
    opinion: null, // string
    phone: null, // array string
    currency: null, // array string
    cuisine: null, // array string
    employees: null, // array string
    avg_price: null, // float
    languages: null, // array string
    images: null, // array string
    socials: null, // object
    at_work: null, // object
    options: null, // object
    geom: null, // object
  },
  
  order: null,
  categories: null,
  dishes: null,
  foodtips: null,
  offers: null,

  dictionary: null,

  loading: false,
  status: null,
  errors: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case Constants.REST_SET:
      return { ...state, ...action.payload };
    case Constants.REST_ERROR_SET:
      return { ...state, error: action.payload, loading: false };
    case Constants.REST_LOADING_SET:
      return {
        ...state,
        loading: action.payload,
        error: null,
        status: null,
      };
    case Constants.REST_CLEAR_ORDER: 
      return {
        ...initState,
        order: null,
      };
    case Constants.REST_REPLACE_ORDER: 
      return {
        ...initState,
        order: action.payload,
      };
    default:
      return state;
  }
}

export function init(payload) {
  return {
    type: Constants.REST_LOAD_INIT,
    payload,
  };
}

export function update(payload) {
  return {
    type: Constants.REST_UPDATE,
    payload,
  };
}

export function updateOrder(payload) {
  return {
    type: Constants.REST_SET_ORDER,
    payload,
  };
}

