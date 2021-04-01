import {
  setLocalStorage,
  getLocalStorage,
} from 'client/utils/localStorage';

const key = 'DigitalCarte';

export const setOfferViewed = (offer = null, callback = () => {}) => {
  if (!offer) return null;
  const local = getLocalStorage(key);
  const { offersViewed } = local.restaurant;
  
  if (offer && local && !offersViewed.some(f => f === offer)) {
    setLocalStorage(key, {
      ...local,
      restaurant: {
        ...local.restaurant,
        offersViewed: [...offersViewed, offer],
      },
    });
    callback();
  }
};

export const setUser = (obj) => {
  const local = getLocalStorage(key);
  if (local) {
    setLocalStorage(key, {
      ...local,
      user: {
        ...local.user,
        ...obj,
      },
    });
  }
};
