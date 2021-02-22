import { takeLatest, select } from 'redux-saga/effects';
import {
  USER_LOGIN,
  USER_LOGOUT,
} from './constants';

function* login() {
  yield select((store) => store.user);
}

function* logout() {
  yield select((store) => store.user);
}

export function* watchLogin() {
  yield takeLatest(USER_LOGIN, login);
}

export function* watchLogout() {
  yield takeLatest(USER_LOGOUT, logout);
}
