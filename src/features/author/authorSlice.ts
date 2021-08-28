import { createSlice } from '@reduxjs/toolkit';

const inAuthorPagePersist = localStorage.getItem('inAuthorPage');

interface InitialState {
  inAuthorPage: boolean;
}

const initialState: InitialState = {
  inAuthorPage: inAuthorPagePersist ? JSON.parse(inAuthorPagePersist) : false,
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
