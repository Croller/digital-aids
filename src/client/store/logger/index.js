import {
  put,
  take,
} from 'redux-saga/effects';
import * as Constants from 'client/store/backOffice/constants';

export function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const { type, payload } = action;
    // const state = yield select();
    // console.log('Saga watch', action, state);

    if (payload) {
      const { token, roles } = payload;
      if (token && roles && type === 'USER_SET') {
        let ids = null;
        if ([2, 3].some(s => roles.includes(s)) && !roles.includes(1)) {
          ids = payload.restaurants;
        }
        yield put({ type: Constants.BO_LOAD_INIT, payload: { ids } });
      }
    } 
  }
}
