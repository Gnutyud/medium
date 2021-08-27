import { call, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import settingApi from '../../api/settingApi';
import { getUserSaga } from './settingSlice';

export function* getCurrentUserSaga(): SagaIterator<void> {
  try {
    const res = yield call(settingApi.getCurrentUser);
    console.log(res.user);
    yield put({
      type: getUserSaga.type,
      payload: res.user,
    });
  } catch (error) {
    console.error(error);
  }
}
