export const categoriesMock = [
  {
    id: 1,
    key: 'dailymenu',
    name: 'Daily Menu',
    dailymenu: true,
    dishes: null,
    offers: null,
    check_age: false,
    options: {
      price: 10.00,
      include: 'Bread and drinks',
      info: {
        title: 'Price is 10 euro per menu for one person.',
        description: 'You can choose only one plate from each category. \n\n In case you would like to order menu for 2 persons, an order should be made twice.',
      },
      work: {
        from: null,
        to: null,
      },
    },
    groups: [
      {
        id: 1001,
        key: 'appities',
        name: 'Appities',
        dishes: [1, 2, 3], // id dishes
      },
      {
        id: 1002,
        key: 'main-dishes',
        name: 'Main Dishes',
        dishes: [4, 5, 6], // id dishes
      },
      {
        id: 1003,
        key: 'drinks',
        name: 'Drinks',
        dishes: [8, 7, 0], // id dishes
      },
    ],
  },
  {
    id: 2,
    key: 'cold-appetizes',
    name: 'Cold Appetizes',
    dailymenu: false,
    groups: null,
    check_age: false,
    options: null,
    dishes: [1, 2, 3], // id dishes
    offers: [
      {
        id: 101,
        src: null,
        url: null,
        description: 'Main Dishes, Main Dishes, Main Dishes, Main Dishes, Main Dishes',
        button: 'Do you know us?',
      },
    ],
  },
  {
    id: 3,
    key: 'hot-appetizes',
    name: 'Hot Appetizes',
    dailymenu: false,
    groups: null,
    check_age: false,
    options: null,
    dishes: [3, 4, 5], // id dishes
    offers: null,
  },
  {
    id: 4,
    key: 'pasta',
    name: 'Pasta',
    dailymenu: false,
    groups: null,
    check_age: false,
    options: null,
    dishes: [5, 6, 7], // id dishes
    offers: null,
  },
  {
    id: 5,
    key: 'soups',
    name: 'Soups',
    dailymenu: false,
    groups: null,
    check_age: false,
    options: null,
    dishes: [1, 2, 3], // id dishes
    offers: null,
  },
  {
    id: 6,
    key: 'desserts',
    name: 'Desserts',
    dailymenu: false,
    groups: null,
    check_age: false,
    options: null,
    dishes: [1, 2, 3], // id dishes
    offers: null,
  },
  {
    id: 7,
    key: 'drinks-with-alcohol',
    name: 'Drinks with alcohol',
    dailymenu: false,
    check_age: true,
    options: null,
    dishes: null,
    offers: [
      {
        id: 101,
        src: null,
        url: null,
        description: 'Don\'t waste your time, \n taste the world every day!',
        button: 'Do you know us?',
      },
    ],
    groups: [
      {
        id: 1007,
        key: 'vine',
        name: 'Vine',
        dishes: [8, 7, 0], // id dishes
      },
      {
        id: 1008,
        key: 'beer',
        name: 'Beer',
        dishes: [13, 14, 15], // id dishes
      },
    ],
  },
  {
    id: 8,
    key: 'drinks-no-alcohol',
    name: 'Drinks no alcohol',
    dailymenu: false,
    check_age: false,
    options: null,
    dishes: null,
    offers: null,
    groups: [
      {
        id: 1005,
        key: 'coffee',
        name: 'Coffe',
        dishes: [1, 2, 3], // id dishes
      },
      {
        id: 1006,
        key: 'tea',
        name: 'Tes',
        dishes: [4, 5, 6], // id dishes
      },
      
    ],
  },
  {
    id: 9,
    key: 'for-children',
    name: 'For children',
    dailymenu: false,
    groups: null,
    check_age: false,
    options: null,
    dishes: [5, 6, 7], // id dishes
    offers: null,
  },
];

export const dishesMock = [
  ...[...(new Array(10))].map((item, i) => ({
    id: i + 1,
    number: i + 1,
    name: 'Spicy Korean salad',
    key: 'spicy-korean-salad',
    description: 'Spicy Korean salad with beef, fresh cucumbers and paprika',
    foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika',
    amount: 200,
    amount_unit: 'gr',
    price_for: 1,
    price_for_unit: 'kg',
    price: 6.50,
    allergens: [i + 1, i + 2, i + 3],
    images: null, // array of image
    cuisine: 'fusion',
    is_stoped: false,
    is_deleted: false,
  })),
  ...[...(new Array(10))].map((item, i) => ({
    id: i + 1 + 10,
    number: i + 1 + 10,
    name: 'Beer Estrella',
    key: 'beer-estrella-galicia--bottle',
    description: null,
    foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika',
    amount: null,
    amount_unit: null,
    price_for: 1,
    price_for_unit: 'kg',
    price: 6.50,
    allergens: null,
    images: null, // array of image
    cuisine: null,
    is_stoped: false,
    is_deleted: false,
  })),
];

export const orderMock = [{
  id: 1,
  key: 'dailymenu',
  name: 'Daily Menu',
  dailymenu: true,
  dishes: null,
  offers: null,
  check_age: false,
  options: {
    price: 10, include: 'Bread and drinks', information: { title: 'Price is 10 euro per menu for one person.', description: ' You can choose only one plate from each category. In case you would like to order menu for 2 persons, an order should be made twice.' }, work: { from: null, to: null }, 
  },
  groups: [{
    id: 1001, key: 'appities', name: 'Appities', dishes: [1, 2, 3], 
  }, {
    id: 1002, key: 'main-dishes', name: 'Main Dishes', dishes: [4, 5, 6], 
  }, {
    id: 1003, key: 'drinks', name: 'Drinks', dishes: [8, 7, 0], 
  }, {
    id: 1004, key: 'alkogol', name: 'Alkogol', dishes: [13, 14, 15], 
  }],
  order_id: 1,
  order: [{
    id: 1001,
    key: 'appities',
    name: 'Appities',
    dishes: [1, 2, 3],
    dish: {
      id: 1, number: 1, name: 'Spicy Korean salad', key: 'spicy-korean-salad', description: 'Spicy Korean salad with beef, fresh cucumbers and paprika', foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika', amount: 200, amount_unit: 'gr', price_for: 1, price_for_unit: 'kg', price: 6.5, allergens: [1, 2, 3], images: null, cuisine: 'fusion', is_stoped: false, is_deleted: false, 
    }, 
  }, {
    id: 1002,
    key: 'main-dishes',
    name: 'Main Dishes',
    dishes: [4, 5, 6],
    dish: {
      id: 4, number: 4, name: 'Spicy Korean salad', key: 'spicy-korean-salad', description: 'Spicy Korean salad with beef, fresh cucumbers and paprika', foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika', amount: 200, amount_unit: 'gr', price_for: 1, price_for_unit: 'kg', price: 6.5, allergens: [1, 2, 3], images: null, cuisine: 'fusion', is_stoped: false, is_deleted: false, 
    }, 
  }, {
    id: 1003,
    key: 'drinks',
    name: 'Drinks',
    dishes: [8, 7, 0],
    dish: {
      id: 7, number: 7, name: 'Spicy Korean salad', key: 'spicy-korean-salad', description: 'Spicy Korean salad with beef, fresh cucumbers and paprika', foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika', amount: 200, amount_unit: 'gr', price_for: 1, price_for_unit: 'kg', price: 6.5, allergens: [1, 2, 3], images: null, cuisine: 'fusion', is_stoped: false, is_deleted: false, 
    }, 
  }, {
    id: 1004,
    key: 'alkogol',
    name: 'Alkogol',
    dishes: [13, 14, 15],
    dish: {
      id: 15, number: 15, name: 'Beer Estrella', key: 'beer-estrella-galicia--bottle', description: null, foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika', amount: null, amount_unit: null, price_for: 1, price_for_unit: 'kg', price: 6.5, allergens: null, images: null, cuisine: null, is_stoped: false, is_deleted: false, 
    }, 
  }], 
}, {
  id: 1,
  key: 'dailymenu',
  name: 'Daily Menu',
  dailymenu: true,
  dishes: null,
  offers: null,
  check_age: false,
  options: {
    price: 10, include: 'Bread and drinks', information: { title: 'Price is 10 euro per menu for one person.', description: ' You can choose only one plate from each category. In case you would like to order menu for 2 persons, an order should be made twice.' }, work: { from: null, to: null }, 
  },
  groups: [{
    id: 1001, key: 'appities', name: 'Appities', dishes: [1, 2, 3], 
  }, {
    id: 1002, key: 'main-dishes', name: 'Main Dishes', dishes: [4, 5, 6], 
  }, {
    id: 1003, key: 'drinks', name: 'Drinks', dishes: [8, 7, 0], 
  }, {
    id: 1004, key: 'alkogol', name: 'Alkogol', dishes: [13, 14, 15], 
  }],
  order_id: 3,
  order: [{
    id: 1003,
    key: 'drinks',
    name: 'Drinks',
    dishes: [8, 7, 0],
    dish: {
      id: 7, number: 7, name: 'Spicy Korean salad', key: 'spicy-korean-salad', description: 'Spicy Korean salad with beef, fresh cucumbers and paprika', foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika', amount: 200, amount_unit: 'gr', price_for: 1, price_for_unit: 'kg', price: 6.5, allergens: [1, 2, 3], images: null, cuisine: 'fusion', is_stoped: false, is_deleted: false, 
    }, 
  }, {
    id: 1002,
    key: 'main-dishes',
    name: 'Main Dishes',
    dishes: [4, 5, 6],
    dish: {
      id: 4, number: 4, name: 'Spicy Korean salad', key: 'spicy-korean-salad', description: 'Spicy Korean salad with beef, fresh cucumbers and paprika', foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika', amount: 200, amount_unit: 'gr', price_for: 1, price_for_unit: 'kg', price: 6.5, allergens: [1, 2, 3], images: null, cuisine: 'fusion', is_stoped: false, is_deleted: false, 
    }, 
  }, {
    id: 1001,
    key: 'appities',
    name: 'Appities',
    dishes: [1, 2, 3],
    dish: {
      id: 2, number: 2, name: 'Spicy Korean salad', key: 'spicy-korean-salad', description: 'Spicy Korean salad with beef, fresh cucumbers and paprika', foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika', amount: 200, amount_unit: 'gr', price_for: 1, price_for_unit: 'kg', price: 6.5, allergens: [1, 2, 3], images: null, cuisine: 'fusion', is_stoped: false, is_deleted: false, 
    }, 
  }], 
}, {
  id: 2,
  key: 'cold-appetizes',
  name: 'Cold Appetizes',
  dailymenu: false,
  groups: null,
  check_age: false,
  options: null,
  dishes: [1, 2, 3],
  offers: [{
    id: 102, src: null, url: null, description: 'Main Dishes, Main Dishes, Main Dishes, Main Dishes, Main Dishes', button: 'Do you know us?', 
  }],
  order_id: 2,
  order: [{
    id: 1, number: 1, name: 'Spicy Korean salad', key: 'spicy-korean-salad', description: 'Spicy Korean salad with beef, fresh cucumbers and paprika', foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika', amount: 200, amount_unit: 'gr', price_for: 1, price_for_unit: 'kg', price: 6.5, allergens: [1, 2, 3], images: null, cuisine: 'fusion', is_stoped: false, is_deleted: false, order_count: 4, 
  }, {
    id: 3, number: 3, name: 'Spicy Korean salad', key: 'spicy-korean-salad', description: 'Spicy Korean salad with beef, fresh cucumbers and paprika', foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika', amount: 200, amount_unit: 'gr', price_for: 1, price_for_unit: 'kg', price: 6.5, allergens: [1, 2, 3], images: null, cuisine: 'fusion', is_stoped: false, is_deleted: false, order_count: 2, 
  }], 
}, {
  id: 6,
  key: 'desserts',
  name: 'Desserts',
  dailymenu: false,
  groups: null,
  check_age: false,
  options: null,
  dishes: [1, 2, 3],
  offers: null,
  order_id: 4,
  order: [{
    id: 1, number: 1, name: 'Spicy Korean salad', key: 'spicy-korean-salad', description: 'Spicy Korean salad with beef, fresh cucumbers and paprika', foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika', amount: 200, amount_unit: 'gr', price_for: 1, price_for_unit: 'kg', price: 6.5, allergens: [1, 2, 3], images: null, cuisine: 'fusion', is_stoped: false, is_deleted: false, order_count: 3, 
  }], 
}];
