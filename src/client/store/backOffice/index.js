import {} from './constants';

const initState = {
  categories: null,
  dishes: null,
  offers: null,

  loading: false,
  errors: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

