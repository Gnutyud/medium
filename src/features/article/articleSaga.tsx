import { PayloadAction } from '@reduxjs/toolkit';
import articlesApi from 'api/articleApi';
import { SagaIterator } from 'redux-saga';
import { call, put } from '@redux-saga/core/effects';
import { getArticleSaga, getError } from './articleSlice';

export function* getArticleBySlugSaga(action: PayloadAction<string>): SagaIterator<void> {
  try {
    const slug = action.payload;
    const res: { article: ArticleType } = yield call(articlesApi.getOne, slug);
    yield put({
      type: getArticleSaga.type,
      payload: res.article,
    });
  } catch (error) {
    yield put({
      type: getError.type,
      payload: error,
    });
  }
}

export function* deleteArticleBySlug(action: PayloadAction<string>): SagaIterator<void> {
  try {
    const slug = action.payload;
    yield call(articlesApi.deleteOne, slug);
  } catch (error) {
    console.log(error);
  }
}
