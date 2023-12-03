import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Inputs } from '../components/react-hook-form';

export interface ReactHookFormState {
  dataRHF: Inputs | null;
}

const initialState: ReactHookFormState = {
  dataRHF: null,
};

export const reactHookFormDataSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<Inputs>) => {
      state.dataRHF = action.payload;
    },
  },
});
