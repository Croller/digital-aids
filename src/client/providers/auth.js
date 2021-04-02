import { get, post } from 'client/providers/common';

export const signIn = async ({ login, password }) => {
  const results = await post('user/signin', { login, password });
  if ([200, 201].includes(results.status) && results.data) {
    return results.data;
  } 
  return null;
};

export const auth = async ({ token }) => {
  const options = {
    Authorization: `Bearer ${token}`,
  };
  const results = await get('user/auth', null, options);
  if ([200, 201].includes(results.status) && results.data) {
    return results.data;
  } 
  return null;
};

// export const getTableByNames = (arr) => {
//   dispatch(setLoading(true));
//   const results = await post('table/get', { names: arr });
//   if (results.status === 200 && !results.data.error) {
//     dispatch(setSupportData(results.data));
//   } else {
//     dispatch(setError(results.data.error));
//   }
// };

