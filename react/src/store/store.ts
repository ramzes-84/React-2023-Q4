import { configureStore } from '@reduxjs/toolkit';
import totalPagesReducer from './total-pages-slice';

export const store = configureStore({
  reducer: {
    totalPages: totalPagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
