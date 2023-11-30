import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HandeledFormData } from '../utils/types';

export interface UsualFormState {
  dataObj: HandeledFormData | null;
}

const initialState: UsualFormState = {
  dataObj: null,
};

export const usualFormDataSlice = createSlice({
  name: 'usualForm',
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<HandeledFormData>) => {
      state.dataObj = action.payload;
    },
  },
});
