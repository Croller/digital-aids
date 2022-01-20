// import { takeLatest, put } from 'redux-saga/effects';
// import * as Constants from 'client/store/user/constants';

// function* set({ payload }) {
//   yield put({ type: Constants.USER_LOADING_SET, payload: true });
//   try {
//     yield put({ type: Constants.USER_SET, payload });
//   } catch (err) {
//     throw err;
//   }
//   yield put({ type: Constants.USER_LOADING_SET, payload: false });
// }

// function* update({ payload }) {
//   yield put({ type: Constants.USER_LOADING_SET, payload: true });
//   try {
//     const data = yield userProvider.update(payload);
//     if (data.error) {
//       yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
//     } else if (data) {
//       yield put({ type: Constants.USER_SET, payload: { info: { ...data }, status: 'updated' } });
//     }
//   } catch (err) {
//     throw err;
//   }
//   yield put({ type: Constants.USER_LOADING_SET, payload: false });
// }

// function* signin({ payload }) {
//   const { language } = payload;
//   yield put({ type: Constants.USER_LOADING_SET, payload: true });
//   try {
//     const data = yield userProvider.signin(payload);
//     if (data.error) {
//       yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
//     } else if (data) {
//       const roles = yield commonProvider.loadRowByParam({
//         name: 'data_roles',
//         token: data.token,
//         language,
//         data: { user_id: data.id }, 
//       });
//       yield put({ type: Constants.USER_SET, payload: { info: { ...data, language }, roles } });
//     }
//   } catch (err) {
//     throw err;
//   }
//   yield put({ type: Constants.USER_LOADING_SET, payload: false });
// }

// function* auth({ payload }) {
//   const { language } = payload;
//   yield put({ type: Constants.USER_LOADING_SET, payload: true });
//   try {
//     const data = yield userProvider.auth(payload);
    
//     if (data.error) {
//       yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
//     } else if (data) {
//       const roles = yield commonProvider.loadRowByParam({
//         language,
//         token: data.token,
//         name: 'data_roles',
//         data: { user_id: data.id },
//       });
//       yield put({ type: Constants.USER_SET, payload: { info: data, roles } });
//     }
//   } catch (err) {
//     throw err;
//   }
//   yield put({ type: Constants.USER_LOADING_SET, payload: false });
// }

// function* signup({ payload }) {
//   yield put({ type: Constants.USER_LOADING_SET, payload: true });
//   try {
//     const data = yield userProvider.signup(payload);
//     if (data.error) {
//       yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
//     } else if (data) {
//       yield put({ type: Constants.USER_SET, payload: { status: 'created' } });
//     }
//   } catch (err) {
//     throw err;
//   }
//   yield put({ type: Constants.USER_LOADING_SET, payload: false });
// }

// function* reset({ payload }) {
//   yield put({ type: Constants.USER_LOADING_SET, payload: true });
//   try {
//     const data = yield userProvider.reset(payload);
//     if (data.error) {
//       yield put({ type: Constants.USER_ERROR_SET, payload: data.error });
//     } else if (data) {
//       yield put({ type: Constants.USER_SET, payload: { status: 'reseted' } });
//     }
//   } catch (err) {
//     throw err;
//   }
//   yield put({ type: Constants.USER_LOADING_SET, payload: false });
// }

// export function* watchUserSet() {
//   yield takeLatest(Constants.USER_SET, set);
// }

// export function* watchUserUpdate() {
//   yield takeLatest(Constants.USER_UPDATE, update);
// }

// export function* watchUserSignIn() {
//   yield takeLatest(Constants.USER_SIGNIN, signin);
// }

// export function* watchUserSignOut() {
//   yield takeLatest(Constants.USER_SIGNOUT, signout);
// }

// export function* watchUserAuth() {
//   yield takeLatest(Constants.USER_AUTH, auth);
// }

// export function* watchUserAuthTwoFactor() {
//   yield takeLatest(Constants.USER_AUTH_TWOFACTOR, authtwofactor);
// }

// export function* watchUserReg() {
//   yield takeLatest(Constants.USER_SIGNUP, signup);
// }

// export function* watchUserChange() {
//   yield takeLatest(Constants.USER_RESET_PASSWORD, reset);
// }

