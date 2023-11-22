import { AppReduxState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
