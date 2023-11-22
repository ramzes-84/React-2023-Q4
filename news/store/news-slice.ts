import { ArticleInCatalog } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface NewsState {
  news: ArticleInCatalog[];
}

const initialNews: NewsState = { news: [] };

export const newsSlice = createSlice({
  name: 'news',
  initialState: initialNews,
  reducers: {
    updateNews: (state, action: PayloadAction<ArticleInCatalog[]>) => {
      state.news = action.payload;
    },
  },
});
