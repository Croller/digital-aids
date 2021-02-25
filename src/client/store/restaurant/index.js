import {
  USER_LOGIN,
  // USER_LOGOUT,
} from './constants';
import { categories, dishes } from './mock';

const initState = {
  id: 213123,
  name: 'Las Cuevas',
  key: 'las-cuevas',
  address: 'Barrio Primero de Mayo 13 - San Miguel de Salinas',
  geo: [37.9763475, -0.7892281],
  phone: ['+34600001117', '34600001117'],
  email: ['dc-google@gmail.com', 'dc-google@gmail.com'],
  avg_price: 2.60,
  currency: ['euro', 'rub'], // first current currency
  cuisine: ['fusion'], // i18n added all kictchen could be
  images: null, // array of image binary
  logo: null, 
  laguages: ['en', 'ru'], // first current laguage
  manager: [
    {
      key: 'director',
      name: 'Alex U',
    }, {
      key: 'manager',
      name: 'Test. u',
    },
  ],
  work_time: [
    {
      key: 'mon',
      from: 0,
      to: 0,
      dayoff: false,
    },
    {
      key: 'tue',
      from: 0,
      to: 0,
      dayoff: false,
    },
    {
      key: 'wed',
      from: 0,
      to: 0,
      dayoff: false,
    },
    {
      key: 'thu',
      from: 0,
      to: 0,
      dayoff: false,
    },
    {
      key: 'fri',
      from: 0,
      to: 0,
      dayoff: false,
    },
    {
      key: 'sat',
      from: 0,
      to: 0,
      dayoff: true,
    },
    {
      key: 'sun',
      from: 0,
      to: 0,
      dayoff: true,
    },
  ],
  raiting: {
    common: {
      rate: 9.5,
      comments: [
        {
          name: 'Alex',
          rate: 5.5,
          text: 'Very good',
        },
      ],
    },
    tripadvisor: {
      rate: 4,
      comments: [],
    },
  },
  socials: [
    {
      key: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/',
    },
    {
      key: 'facebook',
      name: 'FaceBook',
      url: null,
    },
    {
      key: 'tripadviser',
      name: 'TripAdviser',
      url: null,
    },
  ],
  
  categories,
  dishes,
  order: [categories[0], categories[1], categories[2]],
  orders: null,
  
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
