import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Inputs } from '../components/react-hook-form';

export interface ReactHookFormState {
  dataObj: Inputs | null;
}

const initialState: ReactHookFormState = {
  dataObj: null,
};

export const reactHookFormDataSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<Inputs>) => {
      state.dataObj = action.payload;
    },
  },
});
