export const compareBreakpoint = (width, constant) => width && constant && width >= parseInt(constant.replace('px'), 0);

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

export const htmlOverflowYHidden = (trigger) => {
  document.body.style.overflowY = trigger ? 'hidden' : 'unset';
};

export const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
