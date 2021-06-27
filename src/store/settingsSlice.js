import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  budget: 1000,
}

export const settingsSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setBudget: (state, action) => {
      state.budget = action.payload
    },
  }
});

export const { setBudget } = settingsSlice.actions;

export const selectBudget = (state) => state.expenses.budget;

export default settingsSlice.reducer;