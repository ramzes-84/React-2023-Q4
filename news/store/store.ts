import { configureStore } from "@reduxjs/toolkit";
import { totalPagesSlice } from "./total-pages-slice";
import { paramsSlice } from "./params-slice";
import { newsApi } from "../service/newsApi";
import { articleLoaderSlice, newsLoaderSlice } from "./loaders-slice";
import { newsSlice } from "./news-slice";
import { createWrapper } from "next-redux-wrapper";

export const store = () =>
  configureStore({
    reducer: {
      news: newsSlice.reducer,
      totalPages: totalPagesSlice.reducer,
      newsLoader: newsLoaderSlice.reducer,
      articleLoader: articleLoaderSlice.reducer,
      params: paramsSlice.reducer,
      [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(newsApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
