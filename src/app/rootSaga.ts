import { getProfile } from 'features/profile/profileSlice';
import { takeEvery } from '@redux-saga/core/effects';
import { getListArticleSaga, postArticleSaga } from 'features/articles/articlesSaga';
import { getListArticle, postArticle } from 'features/articles/articlesSlice';
import { getCurrentUserSaga, updateCurrentUserSaga } from 'features/setting/settingSaga';
import { getUser, updateUser } from 'features/setting/settingSlice';
import { getListTagSaga } from 'features/tags/tagsSaga';
import { getListTag } from 'features/tags/tagsSlice';
import authSaga from '../features/auth/authSaga';
import { getArticle } from 'features/article/articleSlice';
import { getArticleBySlugSaga } from 'features/article/articleSaga';
import { authActions } from '../features/auth/authSlice';
import { getProfileSaga } from 'features/profile/profileSaga';
export default function* rootSaga() {
  // auth feature
  yield takeEvery(authActions.loginPending.type, authSaga);
  //articles feature
  yield takeEvery(getListArticle.type, getListArticleSaga);
  yield takeEvery(getListTag.type, getListTagSaga);
  yield takeEvery(postArticle.type, postArticleSaga);
  //article feature
  yield takeEvery(getArticle.type, getArticleBySlugSaga);
  //setting feature
  yield takeEvery(getUser.type, getCurrentUserSaga);
  yield takeEvery(updateUser.type, updateCurrentUserSaga);
  // profile feature
  yield takeEvery(getProfile.type, getProfileSaga);
}
