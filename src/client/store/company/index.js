import {} from './constants';

const initState = {
  phone: '+7 (910) 464 30 15',
  email: 'info@digital-aids.com',

  loading: false,
  error: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

