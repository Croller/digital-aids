import { stringToKey } from 'client/utils/common';

export const dataToForm = (data) => {
  const { 
    id,
    type,
    name,
    dishes,
    options,
    is_archived,
    is_deleted,
  } = data;

  const children = data.children ? data.children.map(child => (child.name)) : null;
  
  return {
    id,
    type,
    name,
    dishes,
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
  if (data.children) {
    const editCurrent = current ? current.children.map(item => {
      if (!data.children.some(s => s === item.name)) {
        return { ...item, is_deleted: true };
      }
      return item;
    }) : [];
    children = data.children.map(child => {
      if (editCurrent.length > 0) {
        const exist = editCurrent.find(f => f.name === child);
        if (!exist) {
          return {
            ...modelGroup,
            name: child,
            key: (stringToKey(child) || ''),
            is_deleted: true,
          };
        }
        return exist;
      }
      return {
        ...modelGroup,
        name: child,
        key: (stringToKey(child) || ''),
      };
    });
  }

  return {
    id: current ? current.id : null,
    key: (stringToKey(name) || ''),
    type,
    name,
    dishes: current ? current.dishes : null,
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
  return data.reduce((arr, item) => {
    const parent = item.parent ? arr.find(f => f.id === item.parent) : null;
    if (parent) {
      return arr.map(aItem => {
        if (aItem.id === item.parent) {
          return {
            ...aItem,
            children: aItem.children ? [...aItem.children, item] : [],
          };
        }
        return item;
      });
    }
    return [...arr, { ...item, children: item.children ? item.children : categoryType.find(f => f.type === item.type).children }];
  }, []);
};

export const dataToApi = (data, restaurant) => {
  const edited = {
    ...data,
    restaurant: restaurant.id,
  };
  const children = (edited.children || []).map((item) => {
    const edit = {
      ...categoryType.find(f => f.type === item.type),
      ...item,
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
  key: null,
  parent: null,
  dishes: [],
  children: null,
  options: {},
  is_archived: false,
  is_deleted: false,
};

export const modelGroup = {
  id: null,
  name: 'Default',
  key: 'default',
  parent: null,
  type: 'default',
  dishes: [],
  children: null,
  is_archived: false,
  is_deleted: false,
};

export const categoryType = [
  {
    type: 'default', 
    name: 'Default',
    dishes: [],
    children: null,
    options: {},
  },
  {
    type: 'defaultGroup', 
    name: 'With Group',
    dishes: null,
    children: [],
    options: {},
  },
  {
    type: 'daily', 
    name: 'Daily Menu',
    dishes: null,
    children: [],
    options: {
      price: '0.00',
      info: null,
      descriptions: null,
      at_work: {
        mon: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], tue: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], wed: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], thu: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], fri: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], sat: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], sun: ['2020-01-01T10:00:00.000', '2020-01-01T00:00:00.000'], 
      }, 
    },
  },
  {
    type: 'alcohol', 
    name: 'Alcohol',
    dishes: null,
    children: [],
    options: {
      checkAge: true,
    },
  },
  {
    type: 'organicWine', 
    name: 'Organic Wine',
    dishes: [],
    children: null,
    options: {
      info: null,
    },
  },
];

export const categoryTemp = [
  {
    id: null,
    name: 'Daily Menu',
    key: 'daily-menu',
    parent: null,
    type: 'daily',
    dishes: null,
    children: [
      {
        id: null,
        name: 'Appities',
        key: 'appities',
        parent: null,
        type: null,
        dishes: [],
        children: null,
        is_archived: false,
        is_deleted: false,
      },
      {
        id: null,
        name: 'Main Dishes',
        key: 'main-dishes',
        parent: null,
        type: null,
        dishes: [],
        children: null,
        is_archived: false,
        is_deleted: false,
      },
      {
        id: null,
        name: 'Drinks',
        key: 'drinks',
        parent: null,
        type: null,
        dishes: [],
        children: null,
        is_archived: false,
        is_deleted: false,
      },
    ],
    options: {
      price: '0.00',
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
    name: 'Cold Appetizes',
    key: 'cold-appetizes',
    parent: null,
    type: 'default',
    dishes: [],
    children: null,
    options: {},
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    name: 'Drinks with alcohol',
    key: 'drinks-with-alcohol',
    parent: null,
    type: 'alcohol',
    dishes: null,
    children: [
      {
        id: null,
        name: 'Vine',
        key: 'vine',
        parent: null,
        type: 'default',
        dishes: [],
        children: null,
        is_archived: false,
        is_deleted: false,
      },
      {
        id: null,
        name: 'Beer',
        key: 'beer',
        parent: null,
        type: 'default',
        dishes: [],
        children: null,
        is_archived: false,
        is_deleted: false,
      },
    ],
    options: {},
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    name: 'Drinks',
    key: 'drinks',
    parent: null,
    type: 'defaultGroup',
    dishes: null,
    children: [
      {
        id: null,
        name: 'Coffee',
        key: 'coffee',
        parent: null,
        type: null,
        dishes: [],
        children: null,
        is_archived: false,
        is_deleted: false,
      },
      {
        id: null,
        name: 'Tea',
        key: 'tea',
        parent: null,
        type: null,
        dishes: [],
        children: null,
        is_archived: false,
        is_deleted: false,
      },
    ],
    options: {},
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    name: 'Foodtips',
    key: null,
    parent: null,
    type: 'foodtips',
    dishes: [],
    children: null,
    options: { fieldsProtected: ['name'], rules: { length: '5' } },
    is_archived: false,
    is_deleted: false,
  },
  {
    id: null,
    name: 'Special deals',
    key: null,
    parent: null,
    type: 'specialDeals',
    dishes: [],
    children: null,
    options: { fieldsProtected: ['name'], rules: { length: '1' } },
    is_archived: false,
    is_deleted: false,
  },
];
