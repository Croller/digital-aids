import { takeLatest, put } from 'redux-saga/effects';
import * as Constants from 'client/store/user/constants';
import * as authProvider from 'client/providers/auth';

function* update({ payload }) {
  yield put({ type: Constants.USER_LOADING_SET, payload: true });
  try {
    yield put({ type: Constants.USER_SET, payload });
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.USER_LOADING_SET, payload: false });
}

function* login({ payload }) {
  const { language } = payload;
  yield put({ type: Constants.USER_LOADING_SET, payload: true });
  yield put({ type: Constants.USER_SET, payload: null });
  try {
    const data = yield authProvider.signIn(payload);
    if (data.error) {
      yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
    } else if (data) {
      yield put({ type: Constants.USER_SET, payload: { ...data, language } });
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

export function* watchUserUpdate() {
  yield takeLatest(Constants.USER_UPDATE, update);
}

export function* watchUserLogin() {
  yield takeLatest(Constants.USER_LOGIN, login);
}

export function* watchUserAuth() {
  yield takeLatest(Constants.USER_AUTH, auth);
}

export function* watchUserLogout() {
  yield takeLatest(Constants.USER_LOGOUT, logout);
}

