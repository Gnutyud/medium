import { PayloadAction } from '@reduxjs/toolkit';
import { authActions } from './authSlice';
import { take, fork, call, put } from '@redux-saga/core/effects';
import { LoginPayload } from './authSlice';
import authApi from 'api/authApi';

function* handleLogin(payload: LoginPayload) {
  try {
    const res: PayloadAction<any> = yield call(
      authApi.loginHandler,
      payload.userInfo,
      payload.endPoint
    );
    yield put(authActions.loginSuccess(res));
    // redirect to home page
    payload.history.push('/');
  } catch (error) {
    if (error.response.data.errors) {
      yield put(authActions.loginFail(error.response.data.errors));
    } else {
      yield put(authActions.loginFail(error.message));
    }
  }
}
function* handleLogout() {
  console.log('logout saga');
  yield localStorage.removeItem('user');
}
function* watchLoginFlow() {
  while (true) {
    console.log('flow');
    const isLoggedIn = Boolean(localStorage.getItem('user'));
    if (!isLoggedIn) {
      console.log('login flow');
      const action: PayloadAction<LoginPayload> = yield take(authActions.loginPending.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logoutHandler.type);
    yield fork(handleLogout);
  }
}
export default function* authSaga() {
  yield fork(watchLoginFlow);
}
