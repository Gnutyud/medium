import { call, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import followApi from 'api/followApi';
import { profileApi } from 'api/profileApi';
import { SagaIterator } from 'redux-saga';
import { followProfileSuccess, getProfileSuccess, unFollowProfileSuccess } from './profileSlice';

export function* getProfileSaga(action: PayloadAction<{ username: string }>): SagaIterator<void> {
  try {
    const { username } = action.payload;
    const res = yield call(profileApi.getProfileByUsername, username);

    yield put({
      type: getProfileSuccess.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}

export function* getFollowProfileSaga(
  action: PayloadAction<{ username: string }>
): SagaIterator<void> {
  try {
    const { username } = action.payload;
    console.log('in runner function username ', username);
    const res = yield call(followApi.followOne, username);
    console.log('res ', res);
    yield put({
      type: followProfileSuccess.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}

export function* getUnFollowProfileSaga(
  action: PayloadAction<{ username: string }>
): SagaIterator<void> {
  try {
    const { username } = action.payload;
    const res = yield call(followApi.unFollowOne, username);
    yield put({
      type: unFollowProfileSuccess.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}
