import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { oneArticleReducer } from 'features/article/articleSlice';
import createSagaMiddleware from 'redux-saga';
import articleReducer from '../features/articles/articlesSlice';
import authReducer from '../features/auth/authSlice';
import authorReducer from '../features/profile/profileSlice';
import tagReducer from '../features/tags/tagsSlice';
import settingReducer from './../features/setting/settingSlice';
import rootSaga from './rootSaga';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
    tag: tagReducer,
    setting: settingReducer,
    author: authorReducer,
    oneArticleReducer: oneArticleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// run saga
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
