import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { paramsCreator } from "../utils/params-creator";
import {
  AppReduxState,
  AppUrlParams,
  PageLimitValue,
  RequestParams,
  Sort,
  StorageValues,
} from "@/utils/types";
import { useSearchParams } from "next/navigation";
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
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.params,
      };
    },
  },
});
