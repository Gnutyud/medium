import { takeEvery } from '@redux-saga/core/effects';
import { getListArticleSaga } from 'features/articles/articlesSaga';
import { getListArticle } from 'features/articles/articlesSlice';
import { getListTagSaga } from 'features/tags/tagsSaga';
import { getListTag } from 'features/tags/tagsSlice';

export default function* rootSaga() {
  yield takeEvery(getListArticle.type, getListArticleSaga);
  yield takeEvery(getListTag.type, getListTagSaga);
}
