import { takeLatest, put, select } from 'redux-saga/effects';
import * as Constants from 'client/store/backOffice/constants';
import * as commonProvider from 'client/providers/common';

function* create({ payload }) {
  const token = yield select((store) => store.user.info.token);
  const table = yield select((store) => store.backOffice[payload.name]);
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  try {
    const data = yield commonProvider.create({ ...payload, token });
    if (data.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: data.error });
    } else if (data) {
      yield put({
        type: Constants.BO_SET,
        payload: {
          [payload.name.split('_')[1]]: [...(table || []), data],
        }, 
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.BO_LOADING_SET, payload: false });
}

// function* load({ payload }) {


// }

export function* watchBOupdate() {
  yield takeLatest(Constants.BO_CREATE, create);
}
