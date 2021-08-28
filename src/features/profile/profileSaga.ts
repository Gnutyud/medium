import { PayloadAction } from '@reduxjs/toolkit';
import { getProfileSaga } from './profileSlice';
import { call, put } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import profileApi from '../../api/profileApi';

export function* profileSaga(action: PayloadAction<string>): SagaIterator<void> {
  console.log(action.payload);
  try {
    const res = yield call(profileApi.getProfileByUsername, action.payload);
    console.log(res);
    yield put({
      type: getProfileSaga.type,
      payload: res.profile,
    });
  } catch (error) {
    console.log(error);
  }
}
