import { stringToKey } from 'client/utils/common';

export const dataToForm = (data) => {
  const { 
    id,
    type,
    name,
    dishes,
    options,
  } = data;

  const children = data.children ? data.children.map(child => (child.name)) : null;

  return {
    id,
    type,
    name,
    dishes,
    children,
    ...Object.keys(options).length > 0 ? Object.keys(options).reduce((item, key) => ({ ...item, [`options.${key}`]: options[key] }), {}) : {},
  };
};

export const dataToApi = (data, current) => {
  const {
    id,
    type,
    name,
  } = data;

  const children = data.children ? data.children.map(child => ({
    name: child,
    key: (stringToKey(child) || ''),
    dishes: [],
    children: null,
  })) : null;

  return {
    id: current ? current.id : id,
    key: (stringToKey(name) || ''),
    type,
    name,
    children,
    options: {
      ...Object.keys(data).reduce((item, key) => {
        if (key.indexOf('options') > -1) {
          return { ...item, [key.split('.')[1]]: data[key] };
        }
        return item;
      }, {}),
    },
  };
};

export const model = {
  id: null,
  type: 'default', 
  name: 'Default',
  dishes: [],
  children: null,
  options: {},
};
