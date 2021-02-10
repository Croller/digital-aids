
import { post } from 'client/utils/dataProviders/common';

export const getFile = async ({ path }) => {
  const results = await post('file/get', { path });
  if (results.status === 200 && !results.data.error) {
    return results.data;
  }
  return null;
};

export const updateInfoFile = async ({ path, info }) => {
  const results = await post('file/update/info', { path, info });
  if (results.status === 200 && !results.data.error) {
    return results.data;
  }
  return null;
};

export const createFile = async ({ path }) => {
  const results = await post('file/create', { path });
  if (results.status === 200 && !results.data.error) {
    return results.data;
  }
  return null;
};

