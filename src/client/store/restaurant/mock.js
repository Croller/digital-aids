export const categories = [
  {
    key: 'dailymenu',
    name: 'Daily Menu',
    work: {
      from: null,
      to: null,
    },
    dishes: null,
    offers: null,
    check_age: false,
    options: {
      price: 10,
      currency: 'euro',
      title: 'Price is 10 euro per menu for one person.',
      description: ' You can choose only one plate from each category. In case you would like to order menu for 2 persons, an order should be made twice.',
    },
    groups: [
      {
        key: 'appities',
        name: 'Appities',
        dishes: [1, 2, 3], // id dishes
      },
      {
        key: 'main-dishes',
        name: 'Main Dishes',
        dishes: [4, 5, 6], // id dishes
      },
      {
        key: 'drinks',
        name: 'Drinks',
        dishes: [6, 7, 0], // id dishes
      },
    ],
  },
  {
    key: 'cold-appetizes',
    name: 'Cold Appetizes',
    work: null,
    groups: null,
    check_age: false,
    options: null,
    dishes: [1, 2, 3], // id dishes
    offers: [
      {
        src: null,
        url: null,
        description: 'Main Dishes, Main Dishes, Main Dishes, Main Dishes, Main Dishes',
      },
    ],
  },
  {
    key: 'hot-appetizes',
    name: 'Hot Appetizes',
    work: null,
    groups: null,
    check_age: false,
    options: null,
    dishes: [3, 4, 5], // id dishes
    offers: null,
  },
  {
    key: 'pasta',
    name: 'Pasta',
    work: null,
    groups: null,
    check_age: false,
    options: null,
    dishes: [5, 6, 7], // id dishes
    offers: null,
  },
  {
    key: 'soups',
    name: 'Soups',
    work: null,
    groups: null,
    check_age: false,
    options: null,
    dishes: [1, 2, 3], // id dishes
    offers: null,
  },
  {
    key: 'desserts',
    name: 'Desserts',
    work: null,
    groups: null,
    check_age: false,
    options: null,
    dishes: [1, 2, 3], // id dishes
    offers: null,
  },
  {
    key: 'drinks-with-alcohol',
    name: 'Drinks with alcohol',
    work: null,
    groups: null,
    check_age: false,
    options: null,
    dishes: [5, 6, 7], // id dishes
    offers: null,
  },
  {
    key: 'drinks-no-alcohol',
    name: 'Drinks no alcohol',
    work: null,
    groups: null,
    check_age: false,
    options: null,
    dishes: [3, 4, 5], // id dishes
    offers: null,
  },
  {
    key: 'for-children',
    name: 'For children',
    work: null,
    groups: null,
    check_age: false,
    options: null,
    dishes: [5, 6, 7], // id dishes
    offers: null,
  },
];

export const dishes = [
  {
    id: 1,
    number: 1,
    name: 'Spicy Korean salad',
    description: 'Spicy Korean salad with beef, fresh cucumbers and paprika',
    foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika',
    amount: 200,
    amount_unit: 'gr',
    price_for: 1,
    price_for_unit: 'kg',
    price: 6.50,
    allergens: [1, 2, 3],
    images: null, // array of image
    cuisine: 'fusion',
    is_stoped: false,
    is_deleted: false,
  },
];
