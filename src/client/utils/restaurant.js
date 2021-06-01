// import { v4 as uuidv4 } from 'uuid';
// import { stringToKey, objRecursive } from 'client/utils/common';
import moment from 'moment';
import { weekDays } from 'client/utils/common';

export const getTotal = (arr) => {
  if (arr && Array.isArray(arr)) {
    return arr.reduce((count, item) => {
      if (item.type === 'daily') {
        return count + parseFloat(item.options.price); 
      }
      return count + item.order.reduce((num, ord) => num + (ord.price[0].cost * ord.order_count), 0);
    }, 0);
  }
  return 0;
};

export const getWorkTime = (at_work = null) => {
  const current_date = new Date();
  const weekDayNum = current_date.getDay();
  const weekDayKey = weekDays[weekDayNum];
  const [from, to] = at_work[weekDayKey];
  if (!moment(from).isValid() || !moment(to).isValid()) return '';
  return [moment(from).format('HH:mm'), moment(to).format('HH:mm')].join(' - ');
};

export const getCategoryDish = (categories, dishes, pKey = 'parent') => {
  const results = categories.reduce((result, item) => {
    const copyCurrent = { ...item };
    if (item[pKey]) {
      const parent = result.map(itemParent => {
        if (itemParent.id === copyCurrent[pKey]) {
          const copyParent = { ...itemParent };
          const itemDishes = dishes.filter(f => f.category === copyCurrent.id);
          const copyItem = { ...copyCurrent, dishes: itemDishes };
          let obj = copyParent;
          if (itemParent.children) {
            obj = { ...copyParent, children: [...copyParent.children, copyItem] };
          } else {
            copyParent.children = [copyItem];
          }
          return obj;
        }
        return itemParent;
      }, []);
      return parent;
    }
    const itemDishes = dishes.filter(f => f.category === copyCurrent.id);
    if (itemDishes) {
      return [...result, { ...copyCurrent, dishes: itemDishes }];
    } 
    return [...result, item];
  }, []);
  return results;
};

export const getUrlOrder = (url, dishes, categories) => {
  const params = url.split('?params=')[1];
  // TODO edit 
  // const yourParamName = new URLSearchParams(window.location.search).getAll('yourParamName[]')
  const trimOrder = JSON.parse(decodeURIComponent(params));
  const newOrder = trimOrder.reduce((arr, item) => {
    const catExist = categories.find(f => f.id === item.id);
    if (catExist) {
      if (!catExist.type === 'daily' || (!catExist.type === 'daily' && !catExist.children)) {
        return [
          ...arr,
          {
            ...catExist,
            ...item,
            order: item.order.reduce((arrDish, dish) => {
              const dishExist = dishes.find(f => f.id === dish.id);
              if (dishExist) {
                return [...arrDish, { ...dishExist, ...dish }];
              }
              return arrDish;
            }, []),
          },
        ];
      }
      return [
        ...arr,
        {
          ...catExist,
          order: item.order.reduce((arrDish, cat) => {
            if (catExist.children) {
              const group = catExist.children.find(f => f.id === cat.id);
              const dishExist = dishes.find(f => f.id === cat.dish);
              if (group) {
                return [...arrDish, {
                  ...group,
                  dish: dishExist,
                }];
              }
            }
            const dishExist = dishes.find(f => f.id === cat.id);
            return [...arrDish, {
              ...dishExist,
              ...cat,
            }];
          }, []),
        },
      ];
    }
    return arr;
  }, []);
  return newOrder;
};

// export const getCategoryTemp = () => objRecursive(categoryDefault, (key, value, parent = null) => {
//   if (!value) return { [key]: value };
//   if (key === 'name') {
//     return {
//       id: uuidv4(),
//       [key]: value,
//       key: stringToKey(value),
//       parent: (parent && parent.id) || null,
//     };
//   }
//   return { [key]: value };
// });

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
