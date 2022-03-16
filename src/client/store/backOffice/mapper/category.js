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

export const dataFromToList = (data, current = null, language) => {
  const {
    key,
    name,
  } = data;

  return {
    ...data,
    ...(current && current.id ? { id: current.id } : {}),
    key: language === 'en' ? (stringToKey(name) || '') : key,
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
      ...Object.keys(data).filter(f => f.indexOf('options.') > -1 && f.indexOf('options.at_work') === -1).reduce((item, k) => ({ ...item, [k.split('.')[1]]: data[k] }), {}),
    },
  };
};

export const dataApiToList = (data = null) => {
  if (!data) return null;
  return [...data.filter(f => !f.parent)].map(item => {
    const model = categoryModel.find(f => f.key === item.key);
    return { ...model, ...item };
  });
};

export const dataToApi = (data, restaurant) => {
  const keyFloat = ['price'];
  const edited = {
    ...Object.keys(data).filter(f => f.indexOf('options.') === -1).reduce((obj, key) => {
      let value = data[key];
      if (keyFloat.some(s => key.indexOf(s) > -1)) {
        value = parseFloat(value);
      }
      return { ...obj, [key]: value };
    }, {}),
    restaurant: data.restaurant || restaurant.id,
  };

  return [edited];
};

export const optionsModel = {
  price: 0.00,
  info: null,
  description: null,
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
    key: 'default',
    name: 'Default',
    parent: null,
    restaurant: null,
    options: null,
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    key: 'daily-menu',
    name: 'Daily Menu',
    parent: null,
    restaurant: null,
    options: optionsModel,
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
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
    key: 'foodtips',
    name: 'Foodtips',
    parent: null,
    restaurant: null,
    options: { rules: { info: { maxLength: 5 } } },
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    key: 'special-deals',
    name: 'Special deals',
    parent: null,
    restaurant: null,
    options: { rules: { info: { maxLength: 1 } } },
    is_archived: false,
    is_deleted: false,
  },
];
