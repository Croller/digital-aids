export const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const getLocalStorage = (key) => (JSON.parse(localStorage.getItem(key)));
export const removeLocalStorage = (key) => localStorage.removeItem(key);

// ------------------------------------------------------------------------------------------------------------------------
// func custom

const storageKey = process.env.LOCAL_STORAGE_KEY;

const restaurantSetting = {
  opinionSend: false,
  offersViewed: [],
  table_number: 0,
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
        position: 'guest',
      },
      restaurant: {},
    });
  }
};

export const setOfferViewed = (key, offer = null, callback = () => {}) => {
  const local = getLocalStorage(storageKey);
  if (!offer || !local.restaurant[key]) return null;
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

export const getLocalUser = () => {
  const local = getLocalStorage(storageKey);
  if (local) {
    return local.user;
  }
  return null;
};

export const setLocalUser = (obj) => {
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
  if (local && local.restaurant[key]) {
    return local.restaurant[key];
  }
  setLocalRestaurant(key);
  return restaurantSetting;
};

export const setLocalRestaurant = (key, obj = {}) => {
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

