
import {
  get,
  getExternal,
  post,
  remove,
} from 'client/providers/fetch';

const headers = ({
  token = null,
  language = null,
}) => ({
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...(language ? { 'Accept-Language': language } : {}),
});

export const loadTable = async ({
  token,
  data,
  language = 'en',
}) => {
  const results = await get('table', { data }, headers({ token, language }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const loadRow = async ({
  token,
  name,
  data,
  language = 'en',
}) => {
  const results = await get(`table/${name}/record`, { data }, headers({ token, language }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const loadRowByParam = async ({
  token,
  name,
  data,
  language = 'en',
}) => {
  const results = await post(`table/${name}/record`, { data }, headers({ token, language }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const update = async ({
  token,
  name,
  data,
  language = 'en',
}) => {
  const results = await post(`table/${name}/record/update`, { data }, headers({ token, language }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const deleteFiles = async ({
  token,
  data,
}) => {
  const results = await remove('file/delete', { data }, headers({ token }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const getCoordsByAddress = async ({
  address,
  language = 'en',
}) => {
  const results = await getExternal(`https://maps.googleapis.com/maps/api/geocode/json?language=${language}&address=${address.replace(/ /g, '+')}&key=${process.env.TOKEN_GOOGLE_GEOCODE}`);
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const sendFromInfo = async ({
  token,
  data,
}) => {
  const results = await post('mailer/send', { data }, headers({ token }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

// export const getTableByNames = (arr) => async (dispatch) => {
//   dispatch(setLoading(true));
//   const results = await post('table/get', { names: arr });
//   if (results.status === 200 && !results.data.error) {
//     const data = Object.keys(results.data).reduce((obj, key) => {
//       if (key.indexOf('date') !== -1) {
//         return { ...obj, [key]: moment(results.data[key]).local().format('DD.MM.YYYY') };
//       }
//       return { ...obj, [key]: results.data[key] };
//     }, {});
//     dispatch(setT(data));
//   } else {
//     dispatch(setError(results.data.error));
//   }
// };

// export const insertTableRecord = ({ name, data }) => async (dispatch) => {
//   dispatch(setLoading(true));
//   const results = await post('table/record/create', { name, data });
//   if (results.status === 200 && !results.data.error) {
//     dispatch(addTRecord(name, results.data));
//   } else {
//     dispatch(setError(results.data.error));
//   }
// };

// export const updateTableRecord = ({ name, data }) => async (dispatch) => {
//   const results = await post('table/record/update', { name, data });
//   if (results.status === 200 && !results.data.error) {
//     dispatch(updateTRecord(name, results.data));
//   } else {
//     dispatch(setError(results.data.error));
//   }
// };
