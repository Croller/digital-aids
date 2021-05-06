import { stringToKey } from 'client/utils/common';

export const dataToForm = (data) => {
  const { 
    id,
    count,
    name,
    description,
    allergens,
    images,
    price,
    category,
  } = data;

  return {
    id,
    count,
    name,
    description,
    allergens: allergens || [],
    images,
    ...price.reduce((arr, item, p) => ({
      ...arr,
      ...Object.keys(item).reduce((objArr, key) => ({
        ...objArr,
        [`price[${p}].${key}`]: item[key],
      }), {}),
    }), {}),
    category,
  };
};

export const dataToApi = (data, categories, restaurant) => {
  const keyFloat = ['amount', 'cost'];
  const {
    id,
    count,
    name,
    category,
    description,
    allergens,
  } = data;

  const images = data.images && data.images
    .reduce((arr, file) => {
      if (!file) return arr;
      return [...arr, {
        base64: file.base64,
        uuid: file.uuid,
        path: `/restaurants/dishes/${file.uuid}.png`,
      }];
    }, []);

  const priceObj = Object.keys(data).filter(f => f.indexOf('price[') > -1).reduce((obj, key) => {
    let value = data[key];
    if (keyFloat.some(s => key.indexOf(s) > -1)) {
      value = parseFloat(value);
    }
    return { ...obj, [key.split('.')[1]]: value };
  }, {});
  const categoryObj = Array.isArray(categories) ? categories.find(f => f.key === category || f.id === category).id : categories;

  return {
    id: id || null,
    count,
    key: (stringToKey(name) || ''),
    name,
    description,
    allergens,
    images,
    category: categoryObj,
    price: [priceObj],
    restaurant: restaurant.id,
  };
};

export const model = {
  id: null,
  category: null,
  restaurant: null,
  count: 0,
  key: null,
  name: null,
  description: null,
  cuisine: null,
  images: null,
  price: [
    {
      amount: null,
      cost: null,
      unit: null,
    },
  ],
  options: null,
  allergens: null,
  is_archived: false,
  is_deleted: false,
};
