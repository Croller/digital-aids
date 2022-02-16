const storageKey = process.env.LOCAL_STORAGE_KEY;

export const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const getLocalStorage = (key) => (JSON.parse(localStorage.getItem(key)));
export const removeLocalStorage = (key) => localStorage.removeItem(key);

// ------------------------------------------------------------------------------------------------------------------------
// func custom

const restaurantSetting = {
  opinionSend: false,
  offersViewed: [],
  table_number: 0,
  order: null,
};

export const getLocal = () => getLocalStorage(storageKey);
export const setLocal = (obj) => setLocalStorage(storageKey, { ...getLocal(), ...obj });
export const initLocal = () => {
  const storageEmpty = getLocal() || {
    token: null,
    lng: 'en',
    positions: 'guest',
    checked: {
      cookies: false,
      age: false,
      daily: false,
    },
    restaurant: {},
  };
  setLocal(storageEmpty);
  return storageEmpty;
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

