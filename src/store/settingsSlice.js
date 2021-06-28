import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  budget: 1000,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setBudget: (state, action) => {
      state.budget = action.payload
    },
  }
});

export const { setBudget } = settingsSlice.actions;

export const selectBudget = (state) => state.settings.budget;

export default settingsSlice.reducer;