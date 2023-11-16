import { configureStore } from '@reduxjs/toolkit';
import { totalPagesSlice } from './total-pages-slice';
import { paramsSlice } from './params-slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { newsApi } from '../service/newsApi';
import { articleLoaderSlice, newsLoaderSlice } from './loaders-slice';

export const store = configureStore({
  reducer: {
    totalPages: totalPagesSlice.reducer,
    newsLoader: newsLoaderSlice.reducer,
    articleLoader: articleLoaderSlice.reducer,
    params: paramsSlice.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
