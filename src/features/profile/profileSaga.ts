import { call, put } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { getProfileSuccess } from './profileSlice';
import profileApi from 'api/profileApi';
interface PayloadActionType {
  username: string;
}

export function* getProfileSaga(action: PayloadAction<PayloadActionType>): SagaIterator<void> {
  try {
    const { username } = action.payload;
    console.log('in profile saga: username ', username);
    const res = yield call(profileApi.getProfileByUsername, username);

    yield put({
      type: getProfileSuccess.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}
