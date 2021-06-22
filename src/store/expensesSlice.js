import { createSlice } from '@reduxjs/toolkit';

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    update: (state, action) => [...state, ...action.payload],
    remove: (state, action) => state.filter(expense => expense.key !== action.payload),
  }
});

export const { update, remove } = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses;

export default expensesSlice.reducer;