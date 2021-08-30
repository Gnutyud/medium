import { call, put } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import followApi from 'api/followApi';
import { followProfileSuccess } from './followSlice';

interface PayLoadActionType {
  username: string;
}

export function* getFollowProfileSaga(
  action: PayloadAction<PayLoadActionType>
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
