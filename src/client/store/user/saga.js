import { takeLatest, put } from 'redux-saga/effects';
import * as Constants from 'client/store/user/constants';
import * as userProvider from 'client/providers/user';
import * as commonProvider from 'client/providers/common';

function* updateState({ payload }) {
  yield put({ type: Constants.USER_LOADING_SET, payload: true });
  try {
    yield put({ type: Constants.USER_SET, payload });
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.USER_LOADING_SET, payload: false });
}

function* update({ payload }) {
  yield put({ type: Constants.USER_LOADING_SET, payload: true });
  try {
    const data = yield userProvider.update(payload);
    if (data.error) {
      yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
    } else if (data) {
      yield put({ type: Constants.USER_SET, payload: { info: { ...data }, status: 'updated' } });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.USER_LOADING_SET, payload: false });
}

function* signin({ payload }) {
  const { language } = payload;
  yield put({ type: Constants.USER_LOADING_SET, payload: true });
  try {
    const data = yield userProvider.signin(payload);
    if (data.error) {
      yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
    } else if (data) {
      const roles = yield commonProvider.getRecordByParam({
        language,
        token: data.token,
        name: 'data_roles',
        data: { user_id: data.id }, 
      });
      if (roles.error) {
        yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
      } else if (roles) {
        yield put({ type: Constants.USER_SET, payload: { info: { ...data, language }, roles } });
      }
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.USER_LOADING_SET, payload: false });
}

function* auth({ payload }) {
  const { language } = payload;
  yield put({ type: Constants.USER_LOADING_SET, payload: true });
  try {
    const data = yield userProvider.auth(payload);
    
    if (data.error) {
      yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
    } else if (data) {
      const roles = yield commonProvider.getRecordByParam({
        language,
        token: data.token,
        name: 'data_roles',
        data: { user_id: data.id },
      });
      yield put({ type: Constants.USER_SET, payload: { info: data, roles } });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.USER_LOADING_SET, payload: false });
}

function* signup({ payload }) {
  yield put({ type: Constants.USER_LOADING_SET, payload: true });
  try {
    const data = yield userProvider.signup(payload);
    if (data.error) {
      yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
    } else if (data) {
      yield put({ type: Constants.USER_SET, payload: { status: 'created' } });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.USER_LOADING_SET, payload: false });
}

function* reset({ payload }) {
  yield put({ type: Constants.USER_LOADING_SET, payload: true });
  try {
    const data = yield userProvider.reset(payload);
    if (data.error) {
      yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
    } else if (data) {
      yield put({ type: Constants.USER_SET, payload: { status: 'reseted' } });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.USER_LOADING_SET, payload: false });
}

export function* watchUserUpdateState() {
  yield takeLatest(Constants.USER_SET_STATE, updateState);
}

export function* watchUserUpdate() {
  yield takeLatest(Constants.USER_UPDATE, update);
}

export function* watchUserLogin() {
  yield takeLatest(Constants.USER_LOGIN, signin);
}

export function* watchUserAuth() {
  yield takeLatest(Constants.USER_AUTH, auth);
}

export function* watchUserReg() {
  yield takeLatest(Constants.USER_REGISTRATION, signup);
}

export function* watchUserReset() {
  yield takeLatest(Constants.USER_RESET_PASSWORD, reset);
}

