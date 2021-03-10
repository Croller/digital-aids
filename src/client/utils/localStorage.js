export const setLocalStorage = (key, value, isString = false) => localStorage.setItem(key, !isString ? JSON.stringify(value) : value);

export const getLocalStorage = (key, isString = false) => (!isString ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key));

export const removeLocalStorage = (key) => localStorage.removeItem(key);
