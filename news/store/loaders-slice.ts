import { AppReduxState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialValue: AppReduxState<boolean> = {
  value: true,
};

export const newsLoaderSlice = createSlice({
  name: "newsLoader",
  initialState: initialValue,
  reducers: {
    isLoadingNews: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const articleLoaderSlice = createSlice({
  name: "articleLoader",
  initialState: initialValue,
  reducers: {
    isLoadingArticle: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});
