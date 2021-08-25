import { RootState } from './../../app/store';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  articleList: ArticleType[];
  isLoading: boolean;
}

const initialState: InitialState = {
  articleList: [] as ArticleType[],
  isLoading: false,
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getListArticle: (state) => {
      state.isLoading = true;
    },
    getListArticleFromSaga: (state, action) => {
      state.isLoading = false;
      state.articleList = action.payload.articles;
    },
  },
});

// actions
export const { getListArticle, getListArticleFromSaga } = articlesSlice.actions;

// selector
export const selectListArticles = (state: RootState) => state.article.articleList;
export const selectLoadingArticles = (state: RootState) => state.article.isLoading;

export default articlesSlice.reducer;
