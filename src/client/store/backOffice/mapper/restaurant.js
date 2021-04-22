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
    work_time,
  } = data;

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
    'socials.thefork.url': socials.thefork.url,
    'socials.tripadviser.url': socials.tripadviser.url,
    'socials.facebook.url': socials.facebook.url,
    'socials.instagram.url': socials.instagram.url,
    work_time: work_time.description,
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
    work_time,
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
    socials: JSON.stringify({
      thefork: {
        ...current.socials.thefork,
        url: data['socials.thefork.url'] || null,
      },
      tripadviser: {
        ...current.socials.tripadviser,
        url: data['socials.tripadviser.url'] || null,
      },
      facebook: {
        ...current.socials.facebook,
        url: data['socials.facebook.url'] || null,
      },
      instagram: {
        ...current.socials.instagram,
        url: data['socials.instagram.url'] || null,
      },
    }),
    work_time: JSON.stringify({
      ...current.work_time,
      description: work_time || null,
    }),
  };
};

export const model = {
  id: null,
  key: 'las-ceuvas',
  name: 'Las ceuvas',
  address: 'Barrio Primero de Mayo 13 - San Miguel de Salinas',
  email: ['robert@lascuevas.es'],
  opinion: 'robert@lascuevas.es',
  phone: ['+34 617 241 673'],
  currency: ['EUR'],
  cuisine: ['Spanish'],
  employees: ['Robert Johansen'],
  avg_price: 25.2,
  languages: ['es', 'en', 'ru', 'el', 'it', 'de', 'fr', 'no', 'ja'],
  images: null,
  socials: {
    thefork: {
      rate: null,
      url: 'www.tripadvisor.co.uk/Restaurant_Review-g1238605-',
    },
    tripadviser: {
      rate: null,
      url: null,
    },
    facebook: {
      rate: null,
      url: 'www.facebook.com/Restaurantelascuevas/',
    },
    instagram: {
      rate: null,
      url: 'www.instagram.com/lascuevasrestaurante/',
    },
  },
  work_time: {
    description: '17.00- 22.00',
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
