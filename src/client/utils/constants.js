export const categoryType = [
  {
    key: 'default', 
    name: 'Default',
    options: {},
  },
  {
    key: 'defaultGroup', 
    name: 'With Group',
    options: {},
  },
  {
    key: 'menu', 
    name: 'Main Menu',
    options: {
      fieldsProtected: ['is_archived', 'is_deleted', 'name'],
    },
  },
  {
    key: 'daily', 
    name: 'Daily Menu',
    options: {
      daily: {
        price: '0.00',
        info: 'NULL',
        descriptions: 'NULL',
        at_work: {
          mon: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], tue: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], wed: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], thu: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], fri: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], sat: ['2020-01-01T10:00:00.000', '2020-01-01T22:00:00.000'], sun: ['2020-01-01T10:00:00.000', '2020-01-01T00:00:00.000'], 
        }, 
      }, 
    },
  },
  {
    key: 'alcohol', 
    name: 'Alcohol',
    options: {
      checkAge: true,
    },
  },
  {
    key: 'organicWine', 
    name: 'Organic Wine',
    options: { fields: ['info'] },
  },
  {
    key: 'foodtips', 
    name: 'Foodtips',
    options: { fieldsProtected: ['name', 'type_categories'], rules: { length: '5' } },
  },
  {
    key: 'specialDeals', 
    name: 'Special deals',
    options: { fieldsProtected: ['name', 'type_categories'], rules: { length: '1' } },
  },
];

export const categoryDefault = [
  {
    name: 'Daily Menu',
    key: null,
    type: 'daily',
    dishes: null,
    children: [
      {
        name: 'Appities',
        key: null,
        type: null,
        dishes: [],
        children: null,
      },
      {
        name: 'Main Dishes',
        key: null,
        type: null,
        dishes: [],
        children: null,
      },
      {
        name: 'Drinks',
        key: null,
        type: null,
        dishes: [],
        children: null,
      },
    ],
  },
  {
    name: 'Cold Appetizes',
    key: null,
    type: 'default',
    dishes: [],
    children: null,
  },
  {
    name: 'Hot Appetizes',
    key: null,
    type: 'default',
    dishes: [],
    children: null,
  },
  {
    name: 'Pasta',
    key: null,
    type: 'default',
    dishes: [],
    children: null,
  },
  {
    name: 'Soups',
    key: null,
    type: 'default',
    dishes: [],
    children: null,
  },
  {
    name: 'Desserts',
    key: null,
    type: 'default',
    dishes: [],
    children: null,
  },
  {
    name: 'Drinks with alcohol',
    key: null,
    type: 'alcohol',
    dishes: null,
    children: [
      {
        name: 'Vine',
        key: null,
        type: 'default',
        dishes: [],
        children: null,
      },
      {
        name: 'Beer',
        key: null,
        type: 'default',
        dishes: [],
        children: null,
      },
    ],
  },
  {
    name: 'Drinks no alcohol',
    key: null,
    type: 'defaultGroup',
    dishes: null,
    children: [
      {
        name: 'Coffee',
        key: null,
        type: null,
        dishes: [],
        children: null,
      },
      {
        name: 'Tea',
        key: null,
        type: null,
        dishes: [],
        children: null,
      },
    ],
  },
  {
    name: 'For children',
    key: null,
    type: 'default',
    dishes: [],
    children: null,
  },
  {
    name: 'Foodtips',
    key: null,
    type: 'foodtips',
    dishes: [],
    children: null,
  },
  {
    name: 'Special deals',
    key: null,
    type: 'specialDeals',
    dishes: [],
    children: null,
  },
];
