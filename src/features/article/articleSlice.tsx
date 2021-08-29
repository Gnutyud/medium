import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {} as ArticleType,
    isLoading: false,
    error: null,
  },
  reducers: {
    getArticle: (state) => {
      state.isLoading = true;
    },
    getArticleSaga: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.article = action.payload;
    },
    getError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteArticle: (state) => {
      state.isLoading = true;
    },
    // ,
    // deleteArticleSaga: (state) => {
    //   state.isLoading = false;
    // },
  },
});

const oneArticleReducer = articleSlice.reducer;
export default oneArticleReducer;
export const selectArticle = (state: RootState) => state.oneArticleReducer.article;
export const selectIsloading = (state: RootState) => state.oneArticleReducer.isLoading;
export const selectError = (state: RootState) => state.oneArticleReducer.error;
export const { getArticle, getArticleSaga, getError, deleteArticle } = articleSlice.actions;
