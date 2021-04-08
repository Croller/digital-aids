import { takeLatest, put } from 'redux-saga/effects';
import * as Constants from 'client/store/backOffice/constants';
import * as authProvider from 'client/providers/common';

function* update({ payload }) {
  const { table } = payload;
  yield put({ type: Constants.BO_LOADING_SET, payload: true });
  try {
    const data = yield authProvider.updateTableRecord(payload);
    if (data.error) {
      yield put({ type: Constants.BO_ERROR_SET, payload: data.error });
    } else if (data) {
      yield put({
        type: Constants.BO_SET,
        payload: {
          [table]: data,
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
  yield takeLatest(Constants.BO_CREATE, update);
}
