import { takeEvery } from '@redux-saga/core/effects';
import { getListArticleSaga } from 'features/article/ArticleSaga';
import { getListArticle } from 'features/article/ArticleSlice';

export default function* rootSaga() {
  yield takeEvery(getListArticle.type, getListArticleSaga);
}
