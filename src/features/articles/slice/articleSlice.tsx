import { RootState } from "../../../app/store";
import { ArticleType } from "../helpers/articleType";
import { fetchArticles, postArticle } from "../api/articlesAPI";
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface ArticleState {
  articles: ArticleType[];
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
  async (data) => {
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
        (state, action: PayloadAction<ArticleType[]>) => {
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
        (state, action: PayloadAction<ArticleType>) => {
          state.articles.push(action.payload);
        }
      );
  },
});

// selector
export const selectArticles = (state: RootState) => state.articles.articles;

export default articlesSlice.reducer;