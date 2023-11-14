import { configureStore } from '@reduxjs/toolkit';
import { totalPagesSlice } from './total-pages-slice';
import { newsSlice } from './news-slice';

export const store = configureStore({
  reducer: {
    totalPages: totalPagesSlice.reducer,
    news: newsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
