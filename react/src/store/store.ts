import { configureStore } from '@reduxjs/toolkit';
import { totalPagesSlice } from './total-pages-slice';
// import { newsSlice } from './news-slice';
import { paramsSlice } from './params-slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { newsApi } from '../service/newsApi';

export const store = configureStore({
  reducer: {
    totalPages: totalPagesSlice.reducer,
    // news: newsSlice.reducer,
    params: paramsSlice.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
