import { takeEvery } from '@redux-saga/core/effects';
import { getListArticleSaga } from 'features/articles/articlesSaga';
import { getListArticle } from 'features/articles/articlesSlice';
import { getCurrentUserSaga } from 'features/setting/settingSaga';
import { getUser } from 'features/setting/settingSlice';
import { getListTagSaga } from 'features/tags/tagsSaga';
import { getListTag } from 'features/tags/tagsSlice';

export default function* rootSaga() {
  //articles feature
  yield takeEvery(getListArticle.type, getListArticleSaga);
  yield takeEvery(getListTag.type, getListTagSaga);
  //setting feature
  yield takeEvery(getUser.type, getCurrentUserSaga);
}
