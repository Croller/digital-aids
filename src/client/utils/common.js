export const getUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  return `https://${process.env.HOST}:${process.env.HOST_PORT_SERVER}`;
};

export const compareBreakpoint = (width, constant) => width && constant && width >= parseInt(constant.replace('px'), 0);

export const htmlOverflowYHidden = (trigger) => {
  document.body.style.overflowY = trigger ? 'hidden' : 'unset';
};

export const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

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

export const loadFile = async (filename, url) => {
  const result = await fetch(`${url}/${filename}`);
  const blob = await result.blob();
  const base64 = await getBase64(blob);
  const type = base64 && base64.split(';base64')[0].replace('data:', '');
  return {
    type,
    base64,
    filename,
    originFileObj: new File([blob], filename, { type }),
  };
};

