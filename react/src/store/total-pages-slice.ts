import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppReduxState } from "../types";

const initialReduxTotalPages: AppReduxState<number> = { value: 1 };

export const totalPagesSlice = createSlice({
  name: "totalPages",
  initialState: initialReduxTotalPages,
  reducers: {
    updateTotalPages: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});
