import { call, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { profileApi2 } from 'api/profileApi';
import { SagaIterator } from 'redux-saga';
import { getProfileSuccess } from './profileSlice';
interface PayloadActionType {
  username: string;
}

export function* getProfileSaga(action: PayloadAction<PayloadActionType>): SagaIterator<void> {
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
