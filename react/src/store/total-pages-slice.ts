import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TotalPagesState {
  value: number;
}

const initialReduxTotalPages: TotalPagesState = { value: 1 };

// const savedParams = localStorage.getItem(StorageValues.Settings);
// if (savedParams) {
//   initialReduxParams = JSON.parse(savedParams) as RequestParams;
// }
export const totalPagesSlice = createSlice({
  name: 'totalPages',
  initialState: initialReduxTotalPages,
  reducers: {
    updateTotalPages: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// export const { updateTotalPages } = totalPagesSlice.actions;
// export default totalPagesSlice.reducer;
