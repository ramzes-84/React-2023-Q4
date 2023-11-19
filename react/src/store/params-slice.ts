import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppReduxState, RequestParams, StorageValues } from '../types';
import { paramsCreator } from '../utils/params-creator';

const savedParams = JSON.parse(
  localStorage.getItem(StorageValues.Settings) as string
) as RequestParams;
const urlParams = new URL(document.location.href).searchParams;

const initialParams: AppReduxState<RequestParams> = {
  value: paramsCreator(savedParams, urlParams),
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
