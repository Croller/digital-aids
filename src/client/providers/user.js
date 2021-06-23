import { get, post } from 'client/providers/fetch';
import { detect } from 'detect-browser';

const headers = ({
  token = null,
  language = null,
}) => ({
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...(language ? { 'Accept-Language': language } : {}),
});

export const signIn = async (data) => {
  const results = await post('user/signin', { data: { ...data, browser: { ...detect() } } });
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

export const update = async ({ token, data }) => {
  const results = await post('user/update', { data }, headers({ token }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  } 
  return results;
};

