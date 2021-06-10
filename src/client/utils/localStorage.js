export const setLocalStorage = (key, value, isString = false) => localStorage.setItem(key, !isString ? JSON.stringify(value) : value);

export const getLocalStorage = (key, isString = false) => (!isString ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key));

export const removeLocalStorage = (key) => localStorage.removeItem(key);

// ------------------------------------------------------------------------------------------------------------------------
// func custom

const storageKey = process.env.LOCAL_STORAGE_KEY;

const restaurantSetting = {
  table_number: 0,
  offersViewed: [],
  opinionSend: false,
  order: null,
};

export const getLocal = () => getLocalStorage(storageKey);

export const setLocal = (obj) => setLocalStorage(storageKey, obj);

export const initLocal = () => {
  const exist = getLocal();
  if (!exist) {
    setLocal({
      user: {
        lng: 'en',
        cookies: false,
        token: null,
        enter_at: null,
        check18: false,
        checkDaily: false,
      },
      restaurant: {},
    });
  }
};

export const setOfferViewed = (key, offer = null, callback = () => {}) => {
  if (!offer) return null;
  const local = getLocalStorage(storageKey);
  const { offersViewed } = local.restaurant[key];
  
  if (offer && local && offersViewed && !offersViewed.some(f => f === offer)) {
    setLocalStorage(storageKey, {
      ...local,
      restaurant: {
        ...local.restaurant,
        [key]: {
          ...local.restaurant[key],
          offersViewed: [...local.restaurant[key].offersViewed, offer],
        },
      },
    });
    callback();
  }
};

export const getUser = () => {
  const local = getLocalStorage(storageKey);
  if (local) {
    return local.user;
  }
  return null;
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

export const getLocalRestaurant = (key) => {
  const local = getLocalStorage(storageKey);
  if (local) {
    return local.restaurant[key] || restaurantSetting;
  }
  return restaurantSetting;
};

export const setLocalRestaurant = (key, obj) => {
  const local = getLocalStorage(storageKey);
  const rest = local.restaurant[key] || restaurantSetting;
  if (local) {
    setLocalStorage(storageKey, {
      ...local,
      restaurant: {
        ...local.restaurant,
        [key]: {
          ...rest,
          ...obj,
        },
      },
    });
  }
};

