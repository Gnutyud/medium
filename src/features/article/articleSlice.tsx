import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {} as ArticleType,
    isLoading: false,
    error: null,
    isShowComment: false,
    isLoadingComment: false,
    comments: [] as CommentType[],
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
      state.isLoading = false;
    },
    UpdateArticle: (state) => {
      state.isLoading = false;
    },
    toggleComment: (state) => {
      state.isShowComment = !state.isShowComment;
    },
    getComment: (state) => {
      state.isLoadingComment = true;
    },
    getCommentFromSaga: (state, action) => {
      state.comments = action.payload;
    },
    commentRequest: (state) => {},
    commentSuccess: (state, action) => {
      state.comments = [action.payload, ...state.comments];
    },
    deleteComment: (state) => {},
  },
});

const oneArticleReducer = articleSlice.reducer;
export default oneArticleReducer;
export const selectArticle = (state: RootState) => state.oneArticleReducer.article;
export const selectIsloading = (state: RootState) => state.oneArticleReducer.isLoading;
export const selectError = (state: RootState) => state.oneArticleReducer.error;
export const showComment = (state: RootState) => state.oneArticleReducer.isShowComment;
export const commentList = (state: RootState) => state.oneArticleReducer.comments;
export const {
  getArticle,
  getArticleSaga,
  getError,
  deleteArticle,
  UpdateArticle,
  toggleComment,
  getComment,
  getCommentFromSaga,
  commentRequest,
  commentSuccess,
  deleteComment,
} = articleSlice.actions;
