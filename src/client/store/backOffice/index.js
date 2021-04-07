import {} from './constants';

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
    default:
      return state;
  }
}

