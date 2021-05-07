import { stringToKey } from 'client/utils/common';

export const dataToForm = (data) => {
  const { 
    id,
    type,
    name,
    options,
    is_archived,
    is_deleted,
  } = data;

  const children = data.children ? data.children.map(child => (child.name)) : null;
  
  return {
    id,
    type,
    name,
    children,
    ...Object.keys(options).length > 0 ? Object.keys(options).reduce((item, key) => ({ ...item, [`options.${key}`]: options[key] }), {}) : {},
    is_archived,
    is_deleted,
  };
};

export const dataFromToList = (data, current = null) => {
  const {
    type,
    name,
    parent,
    restaurant,
  } = data;

  let children = null;
  if (data.children && current && current.children) {
    const existChild = current.children.reduce((arr, f) => {
      const exist = data.children.includes(f.name);
      if (exist) {
        return [...arr, { ...f, ...exist }];
      }
      return arr;
    }, []);
    let deletedChild = current.children.filter(f => !data.children.includes(f.name));
    let newChild = data.children.filter(f => !current.children.some(s => s.name === f));
    deletedChild = deletedChild.map(item => ({ ...item, is_deleted: true }));
    newChild = newChild.map(m => ({ ...model, name: m, key: stringToKey(m) }));
    children = [...existChild, ...deletedChild, ...newChild];
  }

  return {
    id: current ? current.id : null,
    key: (stringToKey(name) || ''),
    type,
    name,
    children,
    parent,
    restaurant,
    options: {
      ...Object.keys(data).reduce((item, key) => {
        if (key.indexOf('options') > -1) {
          return { ...item, [key.split('.')[1]]: data[key] };
        }
        return item;
      }, {}),
    },
    is_archived: current ? current.is_archived : false,
    is_deleted: current ? current.is_deleted : false,
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
  const children = (edited.children || []).map((item) => {
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

export const model = {
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
      descriptions: null,
      at_work: {
        mon: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], tue: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], wed: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], thu: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], fri: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], sat: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], sun: ['2020-01-01T10:00:00.000', '2020-01-01T00:00:00.000'], 
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

export const categoryTemp = ({ restaurant }) => [
  {
    id: null,
    name: 'Foodtips',
    key: 'foodtips',
    parent: null,
    type: 'foodtips',
    restaurant,
    options: { rules: { info: { maxLength: '5' } } },
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    name: 'Special deals',
    key: 'special-deals',
    parent: null,
    type: 'specialDeals',
    restaurant,
    options: { rules: { info: { maxLength: '1' } } },
    is_archived: false,
    is_deleted: false,
  },
];
