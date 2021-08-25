import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put } from '@redux-saga/core/effects';
import articleApi from 'api/articleApi';
import { getListArticleFromSaga } from './ArticleSlice';

interface PayloadActionType {
  offset: number;
  limit: number;
}

export function* getListArticleSaga(action: PayloadAction<PayloadActionType>): SagaIterator<void> {
  try {
    const { offset, limit } = action.payload;
    const res = yield call(articleApi.getAll, offset, limit);

    yield put({
      type: getListArticleFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}
