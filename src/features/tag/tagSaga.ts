import { call, put } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import tagApi from 'api/tagApi';
import { getListTagFromSaga } from './tagSlice';

export function* getListTagSaga(action: PayloadAction): SagaIterator<void> {
  try {
    const res = yield call(tagApi.getAll);
    console.log('res', res);
    yield put({
      type: getListTagFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}
