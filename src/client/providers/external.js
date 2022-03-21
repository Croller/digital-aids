import { get, post } from 'client/providers/fetch';

const headers = ({
  token = null,
  language = null,
}) => ({
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...(language ? { 'Accept-Language': language } : {}),
});

export const getCoordsByAddress = async ({ address, language }, token) => {
  const results = await get('external/address-to-coords', { address, language }, headers({ token }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  } 
  return results;
};

export const getTextTranslate = async ({ data }, token) => {
  const results = await post('external/text-language-change', { data }, headers({ token }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  } 
  return results;
};
