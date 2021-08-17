import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTags } from "../api/tagsAPI";
import { RootState } from "../store";

interface TagsState {
  tags: string[];
}

const initialState: TagsState = {
  tags: [],
};

export const tagsAsync = createAsyncThunk("tags/fetchTags", async () => {
  const response = await fetchTags();
  return response.tags;
});

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(tagsAsync.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
  },
});

// selector
export const selectTags = (state: RootState) => state.tags.tags;

export default tagsSlice.reducer;
