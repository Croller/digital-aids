import { get, post } from 'client/utils/dataProviders/common';
import { removeLocalStorage } from 'client/utils/common';
import * as Constants from '../constants';

export const setUser = obj => ({
  type: Constants.GLOBAL_USER_SET,
  obj,
});

export const deleteUser = () => ({
  type: Constants.GLOBAL_USER_DELETE,
});

export const setSupportData = obj => ({
  type: Constants.GLOBAL_SUPPORT_DATA_SET,
  obj,
});

export const setError = obj => ({
  type: Constants.GLOBAL_ERROR_SET,
  obj,
});

export const setLoading = obj => ({
  type: Constants.GLOBAL_LOADING_SET,
  obj,
});

export const signIn = ({ login, password }) => async (dispatch) => {
  dispatch(setLoading(true));
  const results = await post('user/signin', { login, password });
  if (results.status === 200 && !results.data.error) {
    dispatch(setUser(results.data));
  } else {
    dispatch(setError(results.data.error));
  }
};

export const auth = ({ token }) => async (dispatch) => {
  dispatch(setLoading(true));
  const options = {
    Authorization: `Bearer ${token}`,
  };
  const results = await get('user/auth', null, options);
  if (results.status === 200 && !results.data.error) {
    dispatch(setUser(results.data));
  } else {
    dispatch(setError(results.data.error));
    removeLocalStorage('tt');
  }
};

export const logout = () => (dispatch) => {
  removeLocalStorage('tt');
  dispatch(deleteUser());
};

export const getTableByNames = (arr) => async (dispatch) => {
  dispatch(setLoading(true));
  const results = await post('table/get', { names: arr });
  if (results.status === 200 && !results.data.error) {
    dispatch(setSupportData(results.data));
  } else {
    dispatch(setError(results.data.error));
  }
};

