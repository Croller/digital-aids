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
    images: images ? images[0] : [],
    ...price.reduce((arr, item, p) => ([
      ...arr,
      ...Object.keys(item).reduce((objArr, key) => ({
        ...objArr,
        [`price[${p}].${key}`]: item[key],
      }), []),
    ]), []),
  };
};

export const dataToApi = (data, current) => {
  const {
    id,
    number,
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

  const price = [...new Array(Object.keys(data).filter(f => f.indexOf('.amount') > -1).length)].reduce((arr, k, p) => {
    const objPrice = { ...Object.keys(current.price[0]).reduce((obj, key) => ({ ...obj, [key]: data[`price[${p}].${key}`] || current.price[0][key] }), {}) };
    console.log(objPrice);
    return [...arr, objPrice];
  }, []);

  return {
    id: id || current.id,
    number,
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
  allergens: [2, 3, 6],
  images: null,
  cuisine: null,
  price: [
    {
      amount: 1,
      cost: 0.00,
      volume: 200,
      unit: 'gr',
    },
  ],
  is_archived: false,
  is_deleted: false,
};
