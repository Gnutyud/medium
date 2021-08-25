import { RootState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  articleList: ArticleType[];
  articlesCount: number;
  isLoading: boolean;
  numberCurrentPage: number;
  numberArticlePerPage: number;
}

const initialState: InitialState = {
  articleList: [] as ArticleType[],
  articlesCount: 0,
  isLoading: false,
  numberCurrentPage: 0,
  numberArticlePerPage: 5,
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
      state.articlesCount = action.payload.articlesCount;
      state.articleList = action.payload.articles;
    },
    setNumberCurrentPage: (state, action) => {
      state.numberCurrentPage = action.payload;
    },
    setNumberArticlePerPage: (state, action) => {
      state.numberArticlePerPage = action.payload;
    },
  },
});

// actions
export const { getListArticle, getListArticleFromSaga, setNumberCurrentPage } =
  articlesSlice.actions;

// selector
export const selectListArticles = (state: RootState) => state.article.articleList;
export const selectCountArticles = (state: RootState) => state.article.articlesCount;
export const selectLoadingArticles = (state: RootState) => state.article.isLoading;
export const selectNumberCurrentPage = (state: RootState) => state.article.numberCurrentPage;
export const selectNumberArticlePerPage = (state: RootState) => state.article.numberArticlePerPage;

export default articlesSlice.reducer;
