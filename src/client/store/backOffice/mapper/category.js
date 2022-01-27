import { stringToKey } from 'client/utils/common';
import { WEEK_DAYS } from 'client/utils/constants';
import moment from 'moment';

export const dataToForm = (data) => {
  const { 
    id,
    key,
    type,
    name,
    options,
    children,
    is_archived,
    is_deleted,
  } = data;

  const childEdit = (children || []).reduce((obj, child, i) => ({ ...obj, [`children.${i}.name`]: child.name }), {});
  
  return {
    id,
    key,
    type,
    name,
    ...childEdit,
    ...Object.keys(options).length > 0 ? Object.keys(options).reduce((item, okey) => {
      if (okey === 'at_work' && type === 'daily') {
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
    is_archived,
    is_deleted,
  };
};

export const dataFromToList = (data, current = null, language) => {
  const {
    key,
    type,
    name,
    parent,
    restaurant,
    is_archived,
    is_deleted,
  } = data;

  let childrenEdited = current.children;
  if (current && current.children) {
    childrenEdited = current.children.map((child, i) => ({ ...child, name: data[`children.${i}.name`] }));
  }

  let at_work = Object.keys(data).filter(f => f.indexOf('options.at_work') > -1 && (f.indexOf('.from') > -1 || f.indexOf('.to') > -1));
  at_work = at_work.length > 0 ? at_work : null;
  if (at_work) {
    at_work = {
      description: data['options.at_work.description'] || null,
      ...WEEK_DAYS.reduce((obj, k) => ({
        ...obj,
        [k]: [
          moment(data[`options.at_work.${k}.from`], 'HH:mm').isValid() ? `2020-01-01 ${data[`options.at_work.${k}.from`]}:00.000` : null,
          moment(data[`options.at_work.${k}.to`], 'HH:mm').isValid() ? `2020-01-01 ${data[`options.at_work.${k}.to`]}:00.000` : null,
        ],
      }), {}),
    };
  }

  return {
    ...(current && current.id ? { id: current.id } : {}),
    key: language === 'en' ? (stringToKey(name) || '') : key,
    type,
    name,
    children: childrenEdited,
    parent,
    restaurant,
    options: {
      ...(current.options.at_work ? { at_work } : {}),
      ...Object.keys(data).filter(f => f.indexOf('options.') > -1 && f.indexOf('options.at_work') === -1).reduce((item, k) => ({ ...item, [k.split('.')[1]]: data[k] }), {}),
    },
    is_archived,
    is_deleted,
  };
};

export const dataApiToList = (data = null) => {
  if (!data) return null;
  const child = [...data.filter(f => f.parent)];
  return [...data.filter(f => !f.parent)].map(item => {
    const model = categoryModel.find(f => f.type === item.type);
    const children = model && model.children === null ? null : child.filter(f => f.parent === item.id);
    if (children) {
      return {
        ...item,
        children,
      };
    }
    return {
      ...model,
      ...item,
    };
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
  const children = !edited.children ? [] : edited.children.map((item) => {
    const edit = {
      ...categoryModel.find(f => f.type === item.type),
      ...item,
      parent: edited.id || null,
      restaurant: item.restaurant || restaurant.id,
    };
    delete edit.children;
    return edit;
  });
  delete edited.children;

  return [edited, ...children];
};

export const categoryModel = [
  {
    id: null,
    type: 'default', 
    name: 'Default',
    key: 'default',
    parent: null,
    restaurant: null,
    children: null,
    options: {},
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    type: 'defaultGroup', 
    name: 'With Group',
    key: 'with-group',
    parent: null,
    restaurant: null,
    children: [],
    options: {},
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    type: 'daily', 
    name: 'Daily Menu',
    key: 'daily-menu',
    parent: null,
    restaurant: null,
    children: [],
    options: {
      price: 0.00,
      info: null,
      description: null,
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
    },
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    type: 'alcohol', 
    name: 'Alcohol',
    key: 'alcohol',
    parent: null,
    restaurant: null,
    children: [],
    options: {
      checkAge: true,
    },
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    type: 'foodtips',
    name: 'Foodtips',
    key: 'foodtips',
    parent: null,
    restaurant: null,
    options: { rules: { info: { maxLength: 5 } } },
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    type: 'specialDeals',
    name: 'Special deals',
    key: 'special-deals',
    parent: null,
    restaurant: null,
    options: { rules: { info: { maxLength: 1 } } },
    is_archived: false,
    is_deleted: false,
  },
];
