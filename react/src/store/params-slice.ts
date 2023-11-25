import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  AppReduxState,
  AppUrlParams,
  PageLimitValue,
  RequestParams,
  Sort,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialParams: AppReduxState<RequestParams> = {
  value: {
    [AppUrlParams.Details]: "0",
    [AppUrlParams.Limit]: PageLimitValue.ten,
    [AppUrlParams.Page]: "1",
    [AppUrlParams.Query]: "",
    [AppUrlParams.Sort]: Sort.Newest,
  },
};

export const paramsSlice = createSlice({
  name: "params",
  initialState: initialParams,
  reducers: {
    updateParams: (state, action: PayloadAction<RequestParams>) => {
      state.value = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.params,
      };
    },
  },
});
