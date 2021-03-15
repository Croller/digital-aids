import {} from './constants';

const initState = {
  lng: 'es',
  phone: '+34 912 568 714',
  email: 'info@digital-carte.com',

  loading: false,
  errors: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

