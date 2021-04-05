import { takeLatest, select, put } from 'redux-saga/effects';
import * as Constants from 'client/store/user/constants';
import * as authProvider from 'client/providers/auth';

function* login({ payload }) {
  yield select((store) => store.user);
  yield put({ type: Constants.USER_LOADING_SET, payload: true });
  yield put({ type: Constants.USER_SET, payload: null });
  try {
    const data = yield authProvider.signIn(payload);
    if (data.error) {
      yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
    } else if (data) {
      yield put({ type: Constants.USER_SET, payload: data });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.USER_LOADING_SET, payload: false });
}

function* auth({ payload }) {
  yield put({ type: Constants.USER_LOADING_SET, payload: true });
  try {
    const data = yield authProvider.auth(payload);
    if (data.error) {
      yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
    } else if (data) {
      yield put({ type: Constants.USER_SET, payload: data });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.USER_LOADING_SET, payload: false });
}

function* logout() {
  yield put({ type: Constants.USER_SET, payload: null });
}

export function* watchLogin() {
  yield takeLatest(Constants.USER_LOGIN, login);
}

export function* watchAuth() {
  yield takeLatest(Constants.USER_AUTH, auth);
}

export function* watchLogout() {
  yield takeLatest(Constants.USER_LOGOUT, logout);
}

