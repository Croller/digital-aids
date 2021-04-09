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
  console.log(data, current);
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
    images,
    work_time,
  } = data;

  return {
    id,
    name,
    translate: name.replace(/[^a-z0-9]/gi, '-').toLowerCase(),
    address,
    email,
    opinion,
    phone,
    currency: [currency],
    cuisine,
    employees,
    avg_price,
    languages: [main_language, ...sub_languages],
    images: images.map(({ base64, uuid }, i) => ({
      base64,
      uuid,
      path: `/restaurants/${i === 0 ? 'logo' : 'photos'}/${uuid}.png`,
    })),
    socials: JSON.stringify({
      thefork: {
        ...current.socials.thefork,
        url: data['socials.thefork.url'],
      },
      tripadviser: {
        ...current.socials.tripadviser,
        url: data['socials.tripadviser.url'],
      },
      facebook: {
        ...current.socials.facebook,
        url: data['socials.facebook.url'],
      },
      instagram: {
        ...current.socials.instagram,
        url: data['socials.instagram.url'],
      },
    }),
    work_time: JSON.stringify({
      ...current.work_time,
      description: work_time,
    }),
  };
};

export const model = {
  id: null,
  name: 'tetet',
  translate: '343434',
  address: '33r3r',
  email: ['34343'],
  opinion: '3434',
  phone: ['224242'],
  currency: ['EUR'],
  cuisine: ['33434'],
  employees: ['3434'],
  avg_price: 12,
  languages: ['ru', 'en'],
  images: ['3528563b-00fc-4f39-ad20-de14041faf4a', 'da41f536-6aa2-4078-bd97-0347cf137a5f'],
  socials: {
    thefork: {
      rate: null,
      url: 'test',
    },
    tripadviser: {
      rate: null,
      url: 'test',
    },
    facebook: {
      rate: null,
      url: 'test',
    },
    instagram: {
      rate: null,
      url: 'test',
    },
  },
  work_time: 'qwfqwf',
  is_archived: false,
  is_deleted: false,
};
