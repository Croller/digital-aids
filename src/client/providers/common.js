
import { get, post, remove } from 'client/providers/fetch';

export const loadTables = async ({
  token,
  data,
}) => {
  const options = {
    Authorization: `Bearer ${token}`,
  };
  const results = await get('table', { data }, options);
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const load = async ({
  token,
  name,
  data,
}) => {
  const options = {
    Authorization: `Bearer ${token}`,
  };
  const results = await get(`table/${name}/records`, { data }, options);
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const update = async ({
  token,
  name,
  data,
}) => {
  const options = {
    Authorization: `Bearer ${token}`,
  };
  const results = await post(`table/${name}/record/update`, { data }, options);
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const deleteFiles = async ({
  token,
  data,
}) => {
  const options = {
    Authorization: `Bearer ${token}`,
  };
  const results = await remove('file/delete', { data }, options);
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
