import { getProfile } from 'features/profile/profileSlice';
import { fork, takeEvery } from '@redux-saga/core/effects';
import {
  favoriteActionSaga,
  getListArticleSaga,
  postArticleSaga,
} from 'features/articles/articlesSaga';
import { favoriteRequest, getListArticle, postArticle } from 'features/articles/articlesSlice';
import { getCurrentUserSaga, updateCurrentUserSaga } from 'features/setting/settingSaga';
import { getUser, updateUser } from 'features/setting/settingSlice';
import { getListTagSaga } from 'features/tags/tagsSaga';
import { getListTag } from 'features/tags/tagsSlice';
import authSaga from '../features/auth/authSaga';
import { deleteArticle, getArticle, UpdateArticle } from 'features/article/articleSlice';
import {
  deleteArticleBySlug,
  getArticleBySlugSaga,
  updateArticleBySlug,
} from 'features/article/articleSaga';
import { getProfileSaga } from 'features/profile/profileSaga';
export default function* rootSaga() {
  // auth feature
  yield fork(authSaga);
  //articles feature
  yield takeEvery(getListArticle.type, getListArticleSaga);
  yield takeEvery(getListTag.type, getListTagSaga);
  yield takeEvery(postArticle.type, postArticleSaga);
  //article feature
  yield takeEvery(getArticle.type, getArticleBySlugSaga);
  yield takeEvery(deleteArticle.type, deleteArticleBySlug);
  yield takeEvery(UpdateArticle.type, updateArticleBySlug);
  //setting feature
  yield takeEvery(getUser.type, getCurrentUserSaga);
  yield takeEvery(updateUser.type, updateCurrentUserSaga);
  // profile feature
  yield takeEvery(getProfile.type, getProfileSaga);
  // favorite feature
  yield takeEvery(favoriteRequest.type, favoriteActionSaga);
}
