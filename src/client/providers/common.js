
import { get, post } from 'client/providers/fetch';

export const create = async ({
  token,
  name,
  data,
}) => {
  const options = {
    Authorization: `Bearer ${token}`,
  };
  const results = await post(`table/${name}/record`, { ...data }, options);
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const updateFile = async ({
  method,
  token,
  name,
  data,
}) => {
  const options = {
    Authorization: `Bearer ${token}`,
  };
  const results = await post(`back-office/file/${method}`, { name, data }, options);
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
