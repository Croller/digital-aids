export const compareBreakpoint = (width, constant) => width && constant && width >= parseInt(constant.replace('px'), 0);

export const setLocalStorage = (key, value, isString = false) => localStorage.setItem(key, !isString ? JSON.stringify(value) : value);

export const getLocalStorage = (key, isString = false) => (!isString ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key));

export const removeLocalStorage = (key) => localStorage.removeItem(key);

export const downloadFile = (url, filename) => {
  fetch(url).then((t) => t.blob().then((b) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.setAttribute('download', filename);
    if (url.indexOf('pdf') > -1) {
      window.open(url, '_blank');
    } else {
      a.click();
    }
  }));
};
