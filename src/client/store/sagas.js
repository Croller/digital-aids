import { all } from 'redux-saga/effects';
import * as user from './user/saga';

const sagasCombine = Object.values({
  ...user,
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
