import { stringToKey } from 'client/utils/common';

export const dataToForm = (data) => {
  const { 
    id,
    number,
    name,
    description,
    allergens,
    images,
    price,
  } = data;

  return {
    id,
    number,
    name,
    description,
    allergens,
    images: images ? [images[0]] : [],
    ...price.reduce((arr, item, p) => ({
      ...arr,
      ...Object.keys(item).reduce((objArr, key) => ({
        ...objArr,
        [`price[${p}].${key}`]: item[key],
      }), {}),
    }), {}),
  };
};

export const dataToApi = (data, current = null) => {
  const {
    id,
    // number,
    name,
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

  const priceObj = Object.keys(data).filter(f => f.indexOf('price') > -1).reduce((obj, k) => ({ ...obj, [k.replace('price[0].', '')]: data[k] }), {});
  const { price } = priceObj;
  
  return {
    id: id || (current && current.id),
    // number,
    key: (stringToKey(name) || ''),
    name,
    description,
    allergens,
    images,
    price,
  };
};

export const model = {
  id: null,
  number: 2,
  key: 'spicy-korean-salad',
  name: 'Spicy Korean salad',
  description: 'Spicy Korean salad with beef, fresh cucumbers and \n paprika',
  allergens: ['dairy', 'celery', 'mustard'],
  images: null,
  cuisine: null,
  price: [
    {
      amount: 100,
      cost: 12.00,
      unit: 'gr',
    },
  ],
  is_archived: false,
  is_deleted: false,
};
