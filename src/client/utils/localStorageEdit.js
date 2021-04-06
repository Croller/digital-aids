import {
  setLocalStorage,
  getLocalStorage,
} from 'client/utils/localStorage';

const storageKey = process.env.LOCAL_STORAGE_KEY;

export const setOfferViewed = (offer = null, callback = () => {}) => {
  if (!offer) return null;
  const local = getLocalStorage(storageKey);
  const { offersViewed } = local.restaurant;
  
  if (offer && local && !offersViewed.some(f => f === offer)) {
    console.log('local', local);
    console.log('offer', {
      ...local,
      restaurant: {
        ...local.restaurant,
        offersViewed: [...offersViewed, offer],
      },
    });
    setLocalStorage(storageKey, {
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
