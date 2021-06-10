import { stringToKey } from 'client/utils/common';

export const dataToForm = (data) => {
  const { 
    id,
    key,
    count,
    name,
    description,
    allergens,
    images,
    price,
    options,
    category,
  } = data;

  return {
    id,
    key,
    count,
    name,
    description,
    allergens: allergens || [],
    images,
    ...price.reduce((arr, item, p) => ({
      ...arr,
      ...Object.keys(item).reduce((objArr, k) => ({
        ...objArr,
        [`price[${p}].${k}`]: item[k],
      }), {}),
    }), {}),
    ...Object.keys(options).reduce((objArr, k) => ({
      ...objArr,
      [`options.${k}`]: options[k],
    }), {}),
    category,
  };
};

export const dataToApi = (data, categories, restaurant, language) => {
  const keyFloat = ['amount', 'cost'];
  const {
    id,
    key,
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

  const categoryObj = Array.isArray(categories) && categories.length > 0 ? categories.find(f => f.key === category || f.id === category).id : categories.id;
  const optionsObj = Object.keys(data).filter(f => f.indexOf('options.') > -1).reduce((obj, k) => ({ ...obj, [k.split('.')[1]]: data[k] }), {});
  const priceObj = Object.keys(data).filter(f => f.indexOf('price[') > -1).reduce((obj, k) => {
    let value = data[k];
    if (keyFloat.some(s => k.indexOf(s) > -1)) {
      value = parseFloat(value);
    }
    return { ...obj, [k.split('.')[1]]: value };
  }, {});

  return {
    id: id || null,
    count,
    key: language === 'en' ? (stringToKey(name) || '') : key,
    name,
    description,
    allergens,
    images,
    category: categoryObj,
    price: [priceObj],
    options: optionsObj,
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
      amount: 1,
      cost: 0.00,
      unit: 'pc',
    },
  ],
  options: {},
  allergens: null,
  is_archived: false,
  is_deleted: false,
};
