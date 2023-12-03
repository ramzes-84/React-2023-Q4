import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../utils/constants';

export interface CountriesState {
  COUNTRIES: string[];
}

const initialState: CountriesState = {
  COUNTRIES,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});
