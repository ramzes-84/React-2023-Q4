import { AppReduxState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";

const initialReduxTotalPages: AppReduxState<number> = { value: 1 };

export const totalPagesSlice = createSlice({
  name: "totalPages",
  initialState: initialReduxTotalPages,
  reducers: {
    updateTotalPages: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action: PayloadAction<number>) => {
  //     return {
  //       ...state,
  //       ...action.payload,
  //     };
  //   },
  // },
});
