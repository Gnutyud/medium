import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put } from '@redux-saga/core/effects';
import articlesApi from 'api/articlesApi';
import { addArticleFromSaga, getListArticleFromSaga } from './articlesSlice';

interface PayloadActionType {
  offset: number;
  limit: number;
  tag: string;
}

export function* getListArticleSaga(action: PayloadAction<PayloadActionType>): SagaIterator<void> {
  try {
    const { offset, limit, tag } = action.payload;
    const res = yield call(articlesApi.getAll, offset, limit, tag);

    yield put({
      type: getListArticleFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}

export function* postArticleSaga(
  action: PayloadAction<{ article: FormInputArticleType }>
): SagaIterator<void> {
  try {
    const data = action.payload;
    const res = yield call(articlesApi.addOne, data);
    yield put({
      type: addArticleFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}
