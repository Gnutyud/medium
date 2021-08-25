import { takeEvery } from '@redux-saga/core/effects';
import { getListArticleSaga } from 'features/article/articleSaga';
import { getListArticle } from 'features/article/articleSlice';
import { getListTagSaga } from 'features/tag/tagSaga';
import { getListTag } from 'features/tag/tagSlice';

export default function* rootSaga() {
  yield takeEvery(getListArticle.type, getListArticleSaga);
  yield takeEvery(getListTag.type, getListTagSaga);
}
