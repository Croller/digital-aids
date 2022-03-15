import moment from 'moment';
import { WEEK_DAYS } from 'client/utils/constants';

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
  const weekDayKey = WEEK_DAYS[weekDayNum];
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

export const setUrlOrder = (order) => {
  const trimOrder = order.map(item => ({
    id: item.id,
    order_id: item.order_id,
    order: item.order.map(cat => {
      if (item.type !== 'daily') {
        return {
          id: cat.id,
          order_count: cat.order_count,
        };
      }
      return {
        id: cat.id,
        dish: cat.dish.id,
      };
    }),
  }));
  let str = JSON.stringify(trimOrder);
  str = str.replace(/ /g, '');
  const encode = encodeURIComponent(str);
  return encode;
};

export const getUrlOrder = (url = null, dishes = null, categories = null) => {
  if (typeof url !== 'string' || !dishes || !categories) return null;
  const params = url;
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
