import { RootState } from "../store";
import { Type } from "../../helpers/Home/type/Type";
import { fetchArticles, postArticle } from "../api/articlesAPI";
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface ArticleState {
  articles: Type[];
}

const initialState: ArticleState = {
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
    return response.articles;
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
          state.articles = action.payload.map((article) => {
            const randomId = nanoid();
            return {
              ...article,
              id: randomId,
            };
          });
        }
      )
      .addCase(
        createArticle.fulfilled,
        (state, action: PayloadAction<Type>) => {
          state.articles.push(action.payload);
        }
      );
  },
});

// selector
export const selectArticles = (state: RootState) => state.articles.articles;

export default articlesSlice.reducer;
