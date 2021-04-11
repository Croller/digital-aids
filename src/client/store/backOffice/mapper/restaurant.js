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
    phone: phone[0],
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
    .filter(f => f && f)
    .map(({ base64, uuid }, i) => ({
      base64,
      uuid,
      path: `/restaurants/${i === 0 ? 'logo' : 'photos'}/${uuid}.png`,
    }));

  return {
    id: id || current.id,
    name,
    translate: (name || '').replace(/[^a-z0-9]/gi, '-').toLowerCase(),
    address,
    email,
    opinion,
    phone: [phone || null],
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
  name: 'Las ceuvas',
  translate: '343434',
  address: 'Barrio Primero de Mayo 13 - San Miguel de Salinas',
  email: ['robert@lascuevas.es'],
  opinion: 'robert@lascuevas.es',
  phone: ['+34 617 241 673'],
  currency: ['EUR'],
  cuisine: ['Spanish'],
  employees: ['Robert Johansen'],
  avg_price: 25.2,
  languages: ['ru', 'en'],
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
