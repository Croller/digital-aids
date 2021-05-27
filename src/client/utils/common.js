import html2canvas from 'html2canvas';
import { jsPDF as Pdf } from 'jspdf';

// ------------------------------------------------------------------------------------------------------------------------
// logical func

export const getUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  return `https://${process.env.HOST}`;
};

export const compareBreakpoint = (width, constant) => width && constant && width >= parseInt(constant.replace('px'), 0);

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
// variable func

export const stringToKey = (str = null) => {
  if (!str) return null;
  return str.toLowerCase().replace(/[^a-zа-я0-9]/gi, '-');
};

export const getDictionaryItem = (value, key, array, prop = null) => {
  const result = array.find(f => f[key] === value);
  if (prop) {
    return result ? result[prop] : null;
  }
  return result;
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

export const objPlainToDeep = (arr, pKey = 'parent') => {
  const results = arr.reduce((result, item) => {
    if (item[pKey]) {
      const parent = result.map(itemParent => {
        if (itemParent.id === item[pKey]) {
          const copy = { ...itemParent };
          let obj = copy;
          if (itemParent.children) {
            obj = { ...copy, children: [...copy.children, item] };
          } else {
            copy.children = [item];
          }
          return obj;
        }
        return itemParent;
      }, []);
      return parent;
    }
    return [...result, item];
  }, []);
  return results;
};

export const objRecursive = (
  arr = null,
  chKey = 'children',
  callback = (
    key,
    value,
  ) => ({ [key]: value }),
  parent = null,
) => {
  if (!arr) return arr;
  return arr.map((item) => Object.keys(item).reduce((results, key) => {
    if (key === chKey && item[key] && Array.isArray(item[key])) {
      return {
        ...results,
        [key]: objRecursive(item[key], callback, (parent || results)),
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
            let plainKey = `${itemKey}children.`;
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

export const imageToPng = async (file = null, uuid = null) => {
  if (!file && !file.type) return null;
  const type = 'image/png';
  const base64 = await getBase64(file);
  const imgParams = await getImageParams(base64);
  const { width, height } = imgParams;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(imgParams, 0, 0);
  const basePng = canvas.toDataURL('image/png');
  
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
