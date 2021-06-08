import { get, post } from 'client/providers/fetch';
import { detect } from 'detect-browser';

export const signIn = async ({ login, password }) => {
  const results = await post('user/signin', { login, password, browser: { ...detect() } });
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  } 
  return results;
};

export const auth = async ({ token }) => {
  const options = {
    Authorization: `Bearer ${token}`,
  };
  const results = await get('user/auth', null, options);
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

