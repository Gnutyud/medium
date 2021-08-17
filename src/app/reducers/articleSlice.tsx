import { RootState } from "../store";
import { Type } from "../../helpers/Home/type/Type";
import { fetchArticles, postArticle } from "../api/articlesAPI";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArticlesState {
  articles: Type[];
}

const initialState: ArticlesState = {
  articles: [],
};

export const articlesAsync = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const response = await fetchArticles();
    return response.articles;
  }
);

export const createArticle = createAsyncThunk(
  "articles/postArticles",
  async (data: { article: any }) => {
    const response = await postArticle(data);
    return response.data.article;
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        articlesAsync.fulfilled,
        (state, action: PayloadAction<Type[]>) => {
          state.articles = action.payload;
        }
      )
      .addCase(createArticle.fulfilled, (state, action: any) => {
        state.articles.unshift(action.payload);
      });
  },
});

// selector
export const selectArticles = (state: RootState) => state.articles.articles;

export default articlesSlice.reducer;
