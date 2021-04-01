import {} from './constants';

const initState = {
  lng: 'en',

  loading: false,
  errors: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

