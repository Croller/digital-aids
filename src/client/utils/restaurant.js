import { v4 as uuidv4 } from 'uuid';
import { stringToKey, objRecursive } from 'client/utils/common';
import { categoryDefault } from 'client/utils/constants';

export const getTotal = (arr) => {
  if (arr && Array.isArray(arr)) {
    return arr.reduce((count, item) => {
      if (item.dailymenu) {
        return count + item.options.price; 
      }
      return count + item.order.reduce((num, ord) => num + (ord.price * ord.order_count), 0);
    }, 0);
  }
  return 0;
};

export const getCategoryTemp = () => objRecursive(categoryDefault, (key, value, parent = null) => {
  if (!value) return { [key]: value };
  if (key === 'name') {
    return {
      id: uuidv4(),
      [key]: value,
      key: stringToKey(value),
      dishes: [],
      parent,
    };
  }
  return { [key]: value };
});

// const lng = [
//   'en',
//   'es',
//   'el',
//   'it',
//   'de',
//   'fr',
//   'no',
//   'ja',
//   'ko',
//   'ru',
//   'zh',
// ];

// const cat = [
//   'Breakfasts',
//   'Startes',
//   'Appetizers',
//   'Cold Appetizers',
//   'Hot Appetizers',
//   'Salads',
//   'Soups',
//   'Pasta',
//   'Fish',
//   'Meat',
//   'Seafood',
//   'Seafood&Fish',
//   'Desserts',
//   'Burgers',
//   'Bakery',
//   'Vegetarian',
//   'Kids\' Menu',
//   'Drinks',
//   'Wine',
//   'Beer',
//   'Liqueurs',
//   'Brandy',
//   'Beverages',
//   'Wine',
//   'Beer',
//   'Сocktails',
//   'Main courses',
//   'Bottle',
//   'Glass',
//   'Coffee',
//   'Tea',
//   'Red wine',
//   'White wine',
//   'Homemade wine',
//   'Sparkling wine',
//   'Rose wine',
//   'Organic wine',
//   'Vodka',
//   'Whiskey',
//   'Cognac',
//   'Tea&Coffee',
//   'Daily Menu',
//   'Alcohol drinks',
// ];
// console.log(lng.reduce((arr, lg) => {
//   cat.map(ca => `('${})`)
// }));
