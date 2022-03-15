import {
  takeLatest,
  put,
  select,
} from 'redux-saga/effects';
import * as Constants from 'client/store/company/constants';
import * as commonProvider from 'client/providers/common';

function* init() {
  yield put({ type: Constants.PRESENT_LOADING_SET, payload: true });
  const store = yield select((s) => s);
  const { token } = store.user.info;

  try {
    const results = yield commonProvider.getRecordByParam({
      name: 'data_restaurants',
      token,
      language: 'en',
      data: { is_publish: true },
    });
    
    if (results.error) {
      yield put({ type: Constants.PRESENT_ERROR_SET, payload: results.error });
    } else {
      const features = results.map(rest => {
        const edit = { ...rest };
        const feature = { ...edit.geojson };
        delete edit.geojson;
        feature.properties = edit;
        return feature;
      });
      yield put({
        type: Constants.PRESENT_SET,
        payload: {
          restaurants: features,
        },
      });
    }
  } catch (err) {
    throw err;
  }
  yield put({ type: Constants.PRESENT_LOADING_SET, payload: false });
}

export function* watchPRESENTloadInit() {
  yield takeLatest(Constants.PRESENT_LOAD_INIT, init);
}
