export const setLocalStorage = (key, value) => localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
