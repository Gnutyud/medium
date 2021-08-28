import { createSlice } from '@reduxjs/toolkit';
interface InitialState {
  inAuthorPage: boolean;
}

const initialState: InitialState = {
  inAuthorPage: false,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setInAuthorPage: (state, action) => {
      state.inAuthorPage = action.payload;
    },
  },
});

// actions
export const { setInAuthorPage } = authorSlice.actions;

// selector
export const selectInAuthorPage = (state: any) => state.author.inAuthorPage;

export default authorSlice.reducer;
