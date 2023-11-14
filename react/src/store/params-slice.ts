import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppReduxState, PageLimitValue, RequestParams, Sort } from '../types';

const initialParams: AppReduxState<RequestParams> = {
  value: {
    limit: PageLimitValue.ten,
    sort: Sort.Newest,
    page: '1',
    q: '',
  },
};

export const paramsSlice = createSlice({
  name: 'params',
  initialState: initialParams,
  reducers: {
    updateParams: (state, action: PayloadAction<RequestParams>) => {
      state.value = action.payload;
    },
  },
});
