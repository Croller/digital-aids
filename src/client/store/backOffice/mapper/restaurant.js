import { stringToKey } from 'client/utils/common';

export const dataToForm = (data) => {
  const { 
    id,
    name,
    address,
    email,
    opinion,
    phone,
    currency,
    cuisine,
    employees,
    avg_price,
    images,
    socials,
    at_work,
    geojson,
  } = data;

  const goemEdit = (geojson && geojson.geometry.coordinates) || geojson;

  return {
    id,
    name,
    address,
    email,
    opinion,
    phone,
    currency: currency[0],
    cuisine,
    employees,
    avg_price,
    main_language: data.languages[0],
    sub_languages: data.languages.filter(f => f !== data.languages[0]),
    images,
    'socials.facebook.url': socials.facebook.url,
    'socials.instagram.url': socials.instagram.url,
    'socials.thefork.url': socials.thefork.url,
    'socials.thefork.rate': socials.thefork.rate ? parseFloat(socials.thefork.rate) : 0,
    'socials.thefork.comments': socials.thefork.comments ? parseInt(socials.thefork.comments, 0) : 0,
    'socials.tripadvisor.url': socials.tripadvisor.url,
    'socials.tripadvisor.rate': socials.tripadvisor.rate ? parseFloat(socials.tripadvisor.rate) : 0,
    'socials.tripadvisor.comments': socials.tripadvisor.comments ? parseInt(socials.tripadvisor.comments, 0) : 0,
    'at_work.description': at_work.description,
    lat: geojson ? parseFloat(goemEdit[0]) : 0,
    lng: geojson ? parseFloat(goemEdit[1]) : 0,
  };
};

export const dataToApi = (data, current) => {
  const {
    id,
    name,
    address,
    email,
    opinion,
    phone,
    currency,
    cuisine,
    employees,
    avg_price,
    main_language,
    sub_languages,
    lat, lng,
  } = data;

  const images = data.images && data.images
    .reduce((arr, file, i) => {
      if (!file && i === 0) return [...arr, file];
      if (!file && i > 0) return arr;
      return [...arr, {
        base64: file.base64,
        uuid: file.uuid,
        path: `/restaurants/${i === 0 ? 'logo' : 'photos'}/${file.uuid}.png`,
      }];
    }, []);

  return {
    id: id || current.id,
    name,
    key: (stringToKey(name) || ''),
    address,
    email,
    opinion,
    phone,
    currency: [currency || null],
    cuisine,
    employees,
    avg_price,
    languages: [main_language, ...sub_languages],
    images,
    socials: {

      facebook: {
        ...current.socials.facebook,
        url: data['socials.facebook.url'] || null,
      },
      instagram: {
        ...current.socials.instagram,
        url: data['socials.instagram.url'] || null,
      },
      thefork: {
        ...current.socials.thefork,
        url: data['socials.thefork.url'] || null,
        rate: data['socials.thefork.rate'] ? parseFloat(data['socials.thefork.rate']) : 0,
        comments: data['socials.thefork.comments'] ? parseInt(data['socials.thefork.comments'], 0) : 0,
      },
      tripadvisor: {
        ...current.socials.tripadvisor,
        url: data['socials.tripadvisor.url'] || null,
        rate: data['socials.tripadvisor.rate'] ? parseFloat(data['socials.tripadvisor.rate']) : 0,
        comments: data['socials.tripadvisor.comments'] ? parseInt(data['socials.tripadvisor.comments'], 0) : 0,
      },
    },
    at_work: {
      ...current.at_work,
      description: data['at_work.description'] || null,
    },
    geojson: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [lat, lng],
      },
    },
  };
};

export const model = {
  id: null,
  key: null,
  name: '',
  address: '',
  email: [],
  opinion: '',
  phone: [],
  currency: [],
  cuisine: [],
  employees: [],
  avg_price: 0.0,
  languages: ['en', 'ru'],
  images: null,
  geojson: null,
  socials: {
    thefork: {
      comments: 0,
      rate: 0.0,
      url: '',
    },
    tripadvisor: {
      comments: 0,
      rate: 0.0,
      url: '',
    },
    facebook: {
      rate: 0.0,
      url: '',
    },
    instagram: {
      rate: 0.0,
      url: '',
    },
  },
  at_work: {
    description: '',
    mon: [
      '2020-01-01T10:00:00.000',
      '2020-01-01T22:00:00.000',
    ],
    tue: [
      '2020-01-01T10:00:00.000',
      '2020-01-01T22:00:00.000',
    ],
    wed: [
      '2020-01-01T10:00:00.000',
      '2020-01-01T22:00:00.000',
    ],
    thu: [
      '2020-01-01T10:00:00.000',
      '2020-01-01T22:00:00.000',
    ],
    fri: [
      '2020-01-01T10:00:00.000',
      '2020-01-01T22:00:00.000',
    ],
    sat: [
      '2020-01-01T10:00:00.000',
      '2020-01-01T22:00:00.000',
    ],
    sun: [
      '2020-01-01T10:00:00.000',
      '2020-01-01T00:00:00.000',
    ],
  },
  is_archived: false,
  is_deleted: false,
};

// example 
// {
//   id: null,
//   key: 'las-ceuvas',
//   name: 'Las ceuvas',
//   address: 'Barrio Primero de Mayo 13 - San Miguel de Salinas',
//   email: ['robert@lascuevas.es'],
//   opinion: 'robert@lascuevas.es',
//   phone: ['+34 617 241 673'],
//   currency: ['EUR'],
//   cuisine: ['Spanish'],
//   employees: ['Robert Johansen'],
//   avg_price: 25.2,
//   languages: ['es', 'en', 'ru', 'el', 'it', 'de', 'fr', 'no', 'ja'],
//   images: null,
//   geojson: null,
//   socials: {
//     thefork: {
//       comments: 0,
//       rate: 0.0,
//       url: 'www.tripadvisor.co.uk/Restaurant_Review-g1238605-',
//     },
//     tripadvisor: {
//       comments: 0,
//       rate: 0.0,
//       url: null,
//     },
//     facebook: {
//       rate: null,
//       url: 'www.facebook.com/Restaurantelascuevas/',
//     },
//     instagram: {
//       rate: null,
//       url: 'www.instagram.com/lascuevasrestaurante/',
//     },
//   },
//   at_work: {
//     description: '17.00- 22.00',
//     mon: [
//       '2020-01-01T10:00:00.000',
//       '2020-01-01T22:00:00.000',
//     ],
//     tue: [
//       '2020-01-01T10:00:00.000',
//       '2020-01-01T22:00:00.000',
//     ],
//     wed: [
//       '2020-01-01T10:00:00.000',
//       '2020-01-01T22:00:00.000',
//     ],
//     thu: [
//       '2020-01-01T10:00:00.000',
//       '2020-01-01T22:00:00.000',
//     ],
//     fri: [
//       '2020-01-01T10:00:00.000',
//       '2020-01-01T22:00:00.000',
//     ],
//     sat: [
//       '2020-01-01T10:00:00.000',
//       '2020-01-01T22:00:00.000',
//     ],
//     sun: [
//       '2020-01-01T10:00:00.000',
//       '2020-01-01T00:00:00.000',
//     ],
//   },
//   is_archived: false,
//   is_deleted: false,
// };
