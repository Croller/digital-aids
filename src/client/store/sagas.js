import { all } from 'redux-saga/effects';
import * as user from './user/saga';
import * as restaurant from './restaurant/saga';
import * as company from './company/saga';

const sagasCombine = Object.values({
  ...user,
  ...restaurant,
  ...company,
});

export default function* sagas() {
  yield all(sagasCombine);
}

// import * as user from './user/saga';

// const sagasCombine = Object.values({
//   ...user,
// });

// export function* rootSaga() {
//   console.log(sagas);
//   yield sagas;
// }
