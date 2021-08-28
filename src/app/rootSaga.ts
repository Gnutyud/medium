import { authActions } from '../features/auth/authSlice';
import { takeEvery } from '@redux-saga/core/effects';
import { getListArticleSaga, postArticleSaga } from 'features/articles/articlesSaga';
import { postArticle, getListArticle } from 'features/articles/articlesSlice';
import { getCurrentUserSaga, updateCurrentUserSaga } from 'features/setting/settingSaga';
import { getUser, updateUser } from 'features/setting/settingSlice';
import { getListTagSaga } from 'features/tags/tagsSaga';
import { getListTag } from 'features/tags/tagsSlice';
import authSaga from '../features/auth/authSaga';
import { getProfile } from 'features/profile/profileSlice';
import { profileSaga } from 'features/profile/profileSaga';
export default function* rootSaga() {
  // auth feature
  yield takeEvery(authActions.loginPending.type, authSaga);
  //articles feature
  yield takeEvery(getListArticle.type, getListArticleSaga);
  yield takeEvery(getListTag.type, getListTagSaga);
  yield takeEvery(postArticle.type, postArticleSaga);
  //setting feature
  yield takeEvery(getUser.type, getCurrentUserSaga);
  yield takeEvery(updateUser.type, updateCurrentUserSaga);
  // profile feature
  yield takeEvery(getProfile.type, profileSaga);
}
