import { configureStore } from '@reduxjs/toolkit';
import { usualFormDataSlice } from './form-data-slice';
import { countriesSlice } from './countries-slice';
import { reactHookFormDataSlice } from './useform-data-slice';

export const store = configureStore({
  reducer: {
    usualFormData: usualFormDataSlice.reducer,
    reactHookFormData: reactHookFormDataSlice.reducer,
    countries: countriesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
