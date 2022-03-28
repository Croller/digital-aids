import { stringToKey } from 'client/utils/common';
import { WEEK_DAYS } from 'client/utils/constants';
import moment from 'moment';

export const dataToForm = (data) => {
  const { key, options } = data;

  return {
    ...data,
    ...(options && Object.keys(options).length > 0) ? Object.keys(options).reduce((item, okey) => {
      if (okey === 'at_work' && key === 'daily-menu') {
        return {
          ...item,
          'options.at_work.day': 'mon',
          ...WEEK_DAYS.reduce((obj, k) => ({
            ...obj,
            [`options.at_work.${k}.from`]: moment(options.at_work[k][0], 'HH:mm').isValid ? moment(options.at_work[k][0]).format('HH:mm') : null,
            [`options.at_work.${k}.to`]: moment(options.at_work[k][1], 'HH:mm').isValid ? moment(options.at_work[k][1]).format('HH:mm') : null,
          }), {}),
        };
      }
      return { ...item, [`options.${okey}`]: options[okey] };
    }, {}) : {},
  };
};

export const dataToApi = (data, current = null, restaurant, language) => {
  const {
    type,
    key,
    name,
    description,
  } = data;

  return {
    ...current,
    ...(current && current.id ? { id: current.id } : {}),
    type,
    key: language === 'en' ? (stringToKey(name) || '') : key,
    name,
    description,
    restaurant: restaurant.id,
    options: !current.options ? null : {
      ...(!current.options.at_work ? {} : {
        description: data['options.at_work.description'] || null,
        ...WEEK_DAYS.reduce((obj, k) => ({
          ...obj,
          [k]: [
            moment(data[`options.at_work.${k}.from`], 'HH:mm').isValid() ? `2020-01-01 ${data[`options.at_work.${k}.from`]}:00.000` : null,
            moment(data[`options.at_work.${k}.to`], 'HH:mm').isValid() ? `2020-01-01 ${data[`options.at_work.${k}.to`]}:00.000` : null,
          ],
        }), {}),
      }),
    },
  };
};

export const optionsModel = {
  price: 0.00,
  info: null,
  age: 0,
  at_work: {
    description: '9:00-22:00',
    mon: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'],
    tue: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'],
    wed: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'],
    thu: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'],
    fri: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'],
    sat: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'],
    sun: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], 
  }, 
};

export const categoryModel = [
  {
    id: null,
    type: 'default',
    key: 'default',
    name: 'Default',
    description: null,
    parent: null,
    restaurant: null,
    options: null,
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    type: 'daily-menu',
    key: 'daily-menu',
    name: 'Daily Menu',
    description: null,
    parent: null,
    restaurant: null,
    options: optionsModel,
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    type: 'alcohol',
    key: 'alcohol',
    name: 'Alcohol',
    parent: null,
    restaurant: null,
    options: null,
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    type: 'foodtips',
    key: 'foodtips',
    name: 'Foodtips',
    description: null,
    parent: null,
    restaurant: null,
    options: { rules: { info: { maxLength: 5 } } },
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    type: 'special-deals',
    key: 'special-deals',
    name: 'Special deals',
    description: null,
    parent: null,
    restaurant: null,
    options: { rules: { info: { maxLength: 1 } } },
    is_archived: false,
    is_deleted: false,
  },
];
