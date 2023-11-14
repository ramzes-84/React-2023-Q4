import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppReduxState, ArticleInCatalog } from '../types';

const initialNews: AppReduxState<ArticleInCatalog[]> = { value: [] };

export const newsSlice = createSlice({
  name: 'news',
  initialState: initialNews,
  reducers: {
    updateNews: (state, action: PayloadAction<ArticleInCatalog[]>) => {
      state.value = action.payload;
    },
  },
});
