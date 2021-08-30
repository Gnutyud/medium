import { call, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import followApi from 'api/followApi';
import { profileApi2 } from 'api/profileApi';
import { SagaIterator } from 'redux-saga';
import { followProfileSuccess, getProfileSuccess } from './profileSlice';

export function* getProfileSaga(action: PayloadAction<{ username: string }>): SagaIterator<void> {
  try {
    const { username } = action.payload;
    const res = yield call(profileApi2.getProfileByUsername, username);

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
    const res = yield call(followApi.followOne, username);
    yield put({
      type: followProfileSuccess.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}
