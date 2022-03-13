import { get, post, put } from 'client/providers/fetch';
import { detect } from 'detect-browser';

const meta = { browser: detect() };
const headers = ({
  token = null,
  language = null,
}) => ({
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...(language ? { 'Accept-Language': language } : {}),
});

export const signin = async (data) => {
  const results = await post('user/signin', { data: { ...data, meta } });
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  } 
  return results;
};

export const auth = async ({ token }) => {
  const results = await get('user/auth', null, headers({ token }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const signup = async (data) => {
  const results = await post('user/signup', { data: { ...data, meta } });
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  } 
  return results;
};

export const reset = async (data) => {
  const results = await post('user/reset', { data: { ...data, meta } });
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  } 
  return results;
};

export const update = async ({ token, data }) => {
  const results = await put('user/update', { data: { ...data, meta } }, headers({ token }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  } 
  return results;
};

