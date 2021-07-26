import { stringToKey, weekDays } from 'client/utils/common';
import moment from 'moment';

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
    is_publish,
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
    is_publish,
    'socials.facebook.url': socials.facebook.url,
    'socials.instagram.url': socials.instagram.url,
    'socials.thefork.url': socials.thefork.url,
    'socials.thefork.rate': socials.thefork.rate ? parseFloat(socials.thefork.rate) : 0,
    'socials.thefork.comments': socials.thefork.comments ? parseInt(socials.thefork.comments, 0) : 0,
    'socials.tripadvisor.url': socials.tripadvisor.url,
    'socials.tripadvisor.rate': socials.tripadvisor.rate ? parseFloat(socials.tripadvisor.rate) : 0,
    'socials.tripadvisor.comments': socials.tripadvisor.comments ? parseInt(socials.tripadvisor.comments, 0) : 0,
    lat: geojson ? parseFloat(goemEdit[0]) : 0,
    lng: geojson ? parseFloat(goemEdit[1]) : 0,
    'at_work.day': 'mon',
    ...weekDays.reduce((obj, key) => ({
      ...obj,
      [`at_work.${key}.from`]: moment(at_work[key][0]).isValid ? moment(at_work[key][0]).format('HH:mm') : null,
      [`at_work.${key}.to`]: moment(at_work[key][1]).isValid ? moment(at_work[key][1]).format('HH:mm') : null,
    }), {}),
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
    is_publish,
    lat, lng,
  } = data;
  
  const days = Object.keys(current.at_work).filter(f => f !== 'description');
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
    ...(current && current.id ? { id: current.id } : {}),
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
    is_publish,
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
      description: data['at_work.description'] || null,
      ...days.reduce((obj, key) => ({
        ...obj,
        [key]: [
          moment(data[`at_work.${key}.from`], 'HH:mm').isValid() ? `2020-01-01 ${data[`at_work.${key}.from`]}:00.000` : null,
          moment(data[`at_work.${key}.to`], 'HH:mm').isValid() ? `2020-01-01 ${data[`at_work.${key}.to`]}:00.000` : null,
        ],
      }), {}),
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
      '2020-01-01T22:00:00.000',
    ],
  },
  is_archived: false,
  is_deleted: false,
  is_publish: false,
};
