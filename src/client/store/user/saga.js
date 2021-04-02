import { takeLatest, select, put } from 'redux-saga/effects';
import * as Constants from 'client/store/user/constants';
import * as authProvider from 'client/providers/auth';

function* login({ payload }) {
  console.log('payload', payload);
  yield select((store) => store.user);
  yield put({ type: Constants.USER_LOADING_SET, payload: true });
  try {
    const data = yield authProvider.signIn(payload);
    console.log('data', data);
    if (data.error) {
      yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
    } else if (data) {
      yield put({ type: Constants.USER_SET, payload: data });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }

  yield put({ type: Constants.USER_LOADING_SET, payload: false });
}

function* auth() {
  yield select((store) => store.user);
}

function* logout() {
  yield select((store) => store.user);
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
