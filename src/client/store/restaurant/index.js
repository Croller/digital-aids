import {
  REST_SET_ORDER,
  REST_REPLACE_ORDER,
  REST_CLEAR_ORDER,
} from './constants';
import {
  categoriesMock,
  dishesMock,
  orderMock,
  offersMock,
} from './mock';

const initState = {
  info: {
    // id
    // key
    // name
    // address
    // email
    // opinion
    // phone
    // currency
    // cuisine
    // employees
    // avg_price
    // languages
    // images
    // socials
    // work_time
    // is_archived
    // is_deleted
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
    languages: ['en', 'ru'], // first current laguage
    employees: [
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
        url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g1238605-d3329573-Reviews-Las_Cuevas-San_Miguel_de_Salinas_Costa_Blanca_Province_of_Alicante_Valencian_Cou.html',
      },
    },
    socials: [
      {
        key: 'instagram',
        name: 'Instagram',
        url: 'https://www.instagram.com/lascuevasrestaurante/',
      },
      {
        key: 'facebook',
        name: 'FaceBook',
        url: 'https://www.facebook.com/Restaurantelascuevas/?ref=bookmarks',
      },
      {
        key: 'tripadviser',
        name: 'TripAdviser',
        url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g1238605-d3329573-Reviews-Las_Cuevas-San_Miguel_de_Salinas_Costa_Blanca_Province_of_Alicante_Valencian_Cou.html',
      },
    ],
  },
  
  order: orderMock,
  categories: categoriesMock,
  dishes: dishesMock,
  offers: offersMock,
  
  orders: null,

  loading: false,
  errors: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case REST_SET_ORDER: {
      const { order } = state;
      const newOrder = action.payload;
      const stateOrder = [...(order || [])];
      const existOrder = stateOrder.find(f => f.order_id === newOrder.order_id);
      let data = [];
      if (existOrder) {
        // update
        const filtred = stateOrder.reduce((arr, item) => {
          if (item.order_id === newOrder.order_id) {
            if (newOrder.order.length > 0) {
              return [...arr, newOrder];
            }
            return arr;
          }
          return [...arr, item];
        }, []);
        data = filtred.length === 0 ? null : filtred;
      } else {
        // add new
        data = [...stateOrder, newOrder];
      }
      // sort order, daily to top
      data = [
        ...data.filter(f => f.dailymenu),
        ...data.filter(f => !f.dailymenu),
      ];
      return {
        ...initState,
        order: data,
      };
    }
    case REST_CLEAR_ORDER: 
      return {
        ...initState,
        order: null,
      };
    case REST_REPLACE_ORDER: 
      return {
        ...initState,
        order: action.payload,
      };
    default:
      return state;
  }
}

export function replaceOrder(payload) {
  return {
    type: REST_REPLACE_ORDER,
    payload,
  };
}

export function updateOrder(payload) {
  return {
    type: REST_SET_ORDER,
    payload,
  };
}

export function clearOrder() {
  return {
    type: REST_CLEAR_ORDER,
  };
}
