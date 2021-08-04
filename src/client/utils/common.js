import html2canvas from 'html2canvas';
import { jsPDF as Pdf } from 'jspdf';
import { v4 as uuidv4 } from 'uuid';
import imgCompress from 'browser-image-compression';
import * as moment from 'moment';

// ------------------------------------------------------------------------------------------------------------------------
// constants

export const dateTimeFormat = {
  date: 'DD.MM.YYYY',
  dateTime: 'DD.MM.YYYY HH:mm:ss.S',
  time: 'HH:mm',
  database: 'YYYY-MM-DDTHH:mm:ss.SSS',
};

// ------------------------------------------------------------------------------------------------------------------------
// logical func

export const getUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  return `https://${process.env.HOST}`;
};

// ------------------------------------------------------------------------------------------------------------------------
// dom func

export const htmlOverflowYHidden = (trigger) => {
  document.body.style.overflowY = trigger ? 'hidden' : 'unset';
};

export const htmlToImage = async (id) => {
  const canvas = await html2canvas(document.querySelector(`#${id}`));
  const basePng = canvas.toDataURL('image/png');
  return basePng;
};

export const imgToPdf = async (base64, title) => {
  const imgParams = await getImageParams(base64);
  const { width, height } = imgParams;
  const doc = new Pdf('portrait', 'px', [width, height], true, true);
  doc.addImage(base64, 'PNG', 0, 0, width, height);
  doc.save(`${title}.pdf`);
  doc.output('bloburl', { filename: title });
  // window.open(doc.output('bloburl', { filename: title }), '_blank');
};

// ------------------------------------------------------------------------------------------------------------------------
// regex

export const validateBase64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

// ------------------------------------------------------------------------------------------------------------------------
// variable func

export const random4Int = () => Math.floor(1000 + Math.random() * 9000);

export const stringToKey = (str = null) => {
  if (!str) return null;
  return str.toLowerCase().replace(/[^a-zа-я0-9]/gi, '-');
};

export const getDictionaryItem = (value = null, key = 'id', array = null, prop = null) => {
  if (!value || !array || (array && array.length === 0)) return null;
  const result = array.find(f => f[key] === value);
  if (prop) {
    return result ? result[prop] : null;
  }
  return result;
};

export const getDateTime = (value = null, format = dateTimeFormat.date, toDataBase = false) => {
  if (!value || (value && !moment(value).isValid)) return null;
  if (toDataBase) {
    return moment(value, format).format(dateTimeFormat.database);
  }
  return moment(value).format(format);
};

export const getSort = (array = null, key = 'number') => {
  if (!array || (array && !array[0]) || (array && !array[0][key])) return [];
  if (typeof array[0][key] === 'number') {
    return array.sort((a, b) => a[key] - b[key]);
  }
  return array;
};

export const updateItem = (data = null, current = null, key = 'id') => {
  if (!data || !current) return data;
  if (Array.isArray(data) && Array.isArray(current)) {
    if (current && current.length > 0) {
      return data.reduce((arr, item) => {
        const exist = arr.some(f => f[key] === item[key]);
        if (exist) {
          return arr.map(f => {
            if (f[key] === item[key]) {
              return { ...f, ...item };
            }
            return f;
          }); 
        }
        return [...arr, item];
      }, [...current]);
    }
    return [...(current || []), ...data];
  }
  return {
    ...(current || {}),
    ...data,
  };
};

export const objRecursive = (
  arr = null,
  callback = (
    key,
    value,
  ) => ({ [key]: value }),
  parent = null,
) => {
  if (!arr || (arr && !Array.isArray(arr))) return arr;
  return arr.map((item) => Object.keys(item).reduce((results, key) => {
    if (item[key] && Array.isArray(item[key])) {
      return {
        ...results,
        [key]: objRecursive(item[key], callback(), (parent || results)),
      };
    }
    return {
      ...results,
      ...callback(key, item[key], parent),
    };
  }, {}));
};

export const objRecUpdate = (
  arr = null,
  callback = (
    key,
    value,
  ) => ({ [key]: value }),
  parent = null,
) => {
  if (!arr || (arr && !Array.isArray(arr))) {
    return {
      updated: null,
      plain: {},
      array: [],
    };
  }
  const calculate = arr.reduce((items, item, index) => {
    const itemKey = !parent ? `item[${index}].` : '';
    let array = [];
    let plains = {};
    return {
      updated: [
        ...items.updated,
        {
          ...Object.keys(item).reduce((obj, key) => {
            let plainKey = `${itemKey}.`;
            let results = { updated: [], plain: {}, array: [] };
            results = objRecUpdate(item[key], callback, (parent || obj.id));
            if (key !== 'children') {
              plainKey = itemKey;
              const call = callback(key, item[key], parent);
              results.updated = call;
              results.plain = call;
            } else {
              array = [...(results.updated || [])].map(child => {
                const copyChild = { ...child };
                delete copyChild.children;
                return copyChild;
              });
            }
            const { updated, plain } = results;
            plains = {
              ...plains,
              ...Object.keys(plain).reduce((pItems, pkey) => ({ ...pItems, [`${plainKey}${pkey}`]: plain[pkey] }), {}), 
            };
            return {
              ...obj,
              ...(key === 'children' ? { children: updated } : updated),
            };
          }, {}),
        },
      ],
      plain: { ...items.plain, ...plains },
      array: [...items.array, ...array],
    };
  }, { updated: [], plain: {}, array: [] });

  calculate.array = [...calculate.array, ...(calculate.updated || [])].map(child => {
    const copyChild = { ...child };
    delete copyChild.children;
    return copyChild;
  });
  return calculate;
};

export const objDeepToPlain = (
  source = null,
  parent = '',
) => {
  if (!source) return null;
  if (Array.isArray(source)) {
    return source.reduce((ob, item, i) => {
      const dot = Array.isArray(item) ? '' : '.';
      return { ...ob, ...objDeepToPlain(item, `${parent || 'obj'}[${i}]${dot}`) };
    }, {});
  }
  return Object.keys(source).reduce((results, key) => {
    let edited = { [`${parent}${key}`]: source[key] };
    if (!source[key]) return { ...results, ...edited };
    if (Array.isArray(source[key]) || typeof source[key] === 'object') {
      let parentSub = '';
      if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
        parentSub = '.';
      }
      edited = objDeepToPlain(source[key], `${parent}${key}${parentSub}`);
    }
    return { ...results, ...edited };
  }, {});
};

// ------------------------------------------------------------------------------------------------------------------------
// file func

export const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const downloadFile = (url, filename) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = filename;
  downloadLink.click();
};

export const loadFile = async (url = null, uuid = null) => {
  if (!url || !uuid) return null;
  const result = await fetch(url);
  const blob = await result.blob();
  const base64 = await getBase64(blob);
  const type = base64 && base64.split(';base64')[0].replace('data:', '');
  return {
    type,
    base64,
    uuid,
    originFileObj: new File([blob], uuid, { type }),
  };
};

export const imageConverter = async (file = null, uuid = null, type = 'image/png') => {
  if (!file && !file.type) return null;
  const base64 = await getBase64(file);
  const imgParams = await getImageParams(base64);
  const { width, height } = imgParams;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(imgParams, 0, 0);
  const basePng = canvas.toDataURL(type);
  
  const result = await fetch(basePng);
  const blob = await result.blob();
  return {
    type,
    base64: basePng,
    uuid,
    originFileObj: new File([blob], uuid, { type }),
  };
};

const getImageParams = (src) => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = reject;
  img.src = src;
});

export const imageResize = async (file, crop, type = 'image/png') => {
  const imgParams = document.querySelector('.ReactCrop__image');
  const {
    width,
    height,
    naturalWidth,
    naturalHeight,
  } = imgParams;

  if (naturalWidth > naturalHeight) {
    imgParams.style.height = 'unset';
  }
  
  const scaleX = naturalWidth / width;
  const scaleY = naturalHeight / height;
  const canvas = document.createElement('canvas');
  const pixelRatio = window.devicePixelRatio;

  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;

  const ctx = canvas.getContext('2d');
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    imgParams,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );
  const basePng = canvas.toDataURL(type);
  const result = await fetch(basePng);
  const blob = await result.blob();
  return {
    type,
    base64: basePng,
    uuid: file.uuid,
    originFileObj: new File([blob], file.uuid, { type }),
  };
};

export const imageCompression = async (file, options = {}) => {
  let png = file;
  const uuid = png.uuid || uuidv4();
  const opt = {
    maxSizeMB: 15,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    ...options,
  };
  if (png.type !== 'image/png') {
    png = await imageConverter(png.originFileObj, uuid);
  }
  
  const compresed = await imgCompress(png.originFileObj, opt);
  return {
    uuid,
    originFileObj: compresed,
    base64: await getBase64(compresed),
  };
};
