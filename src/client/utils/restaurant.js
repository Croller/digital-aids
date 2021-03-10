import {
  setLocalStorage,
  getLocalStorage,
} from 'client/utils/localStorage';

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

export const setOfferViewed = (offer = null, callback = () => {}) => {
  if (!offer) return null;
  const str = 'DigitalCarte';
  const local = getLocalStorage(str);
  if (offer && !local.offersViewed.some(f => f === offer)) {
    setLocalStorage(str, {
      ...local,
      offersViewed: [...local.offersViewed, offer],
    });
    callback();
  }
};
