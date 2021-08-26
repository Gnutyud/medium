import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put } from '@redux-saga/core/effects';
import articleApi from 'api/articlesApi';
import { getListArticleFromSaga } from './articlesSlice';

interface PayloadActionType {
  offset: number;
  limit: number;
  tag: string;
}

export function* getListArticleSaga(action: PayloadAction<PayloadActionType>): SagaIterator<void> {
  try {
    const { offset, limit, tag } = action.payload;
    const res = yield call(articleApi.getAll, offset, limit, tag);

    yield put({
      type: getListArticleFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}
