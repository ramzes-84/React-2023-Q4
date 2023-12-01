import { configureStore } from '@reduxjs/toolkit';
import { usualFormDataSlice } from './form-data-slice';
import { countriesSlice } from './countries-slice';

export const store = configureStore({
  reducer: {
    usualFormData: usualFormDataSlice.reducer,
    countries: countriesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
