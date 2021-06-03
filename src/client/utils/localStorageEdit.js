import {
  setLocalStorage,
  getLocalStorage,
} from 'client/utils/localStorage';

const storageKey = process.env.LOCAL_STORAGE_KEY;

export const setOfferViewed = (offer = null, callback = () => {}) => {
  if (!offer) return null;
  const local = getLocalStorage(storageKey);
  const { offersViewed } = local.restaurant;
  
  if (offer && local && offersViewed && !offersViewed.some(f => f === offer)) {
    setLocalStorage(storageKey, {
      ...local,
      restaurant: {
        ...local.restaurant,
        offersViewed: [...local.restaurant.offersViewed, offer],
      },
    });
    callback();
  }
};

export const setUser = (obj) => {
  const local = getLocalStorage(storageKey);
  if (local) {
    setLocalStorage(storageKey, {
      ...local,
      user: {
        ...local.user,
        ...obj,
      },
    });
  }
};

export const setRestaurent = (obj) => {
  const local = getLocalStorage(storageKey);
  if (local) {
    setLocalStorage(storageKey, {
      ...local,
      restaurant: {
        ...local.restaurant,
        ...obj,
      },
    });
  }
};

export const getLocal = () => getLocalStorage(storageKey);
export const setLocal = (obj) => setLocalStorage(storageKey, obj);
