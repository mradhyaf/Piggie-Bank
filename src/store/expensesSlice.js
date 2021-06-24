import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: []
}

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    update: (state, action) => {
      state.history = [...state.history, ...action.payload]
    },
    remove: (state, action) => {
      state.history = state.history.filter(expense => expense.key !== action.payload)
    },
  }
});

export const { update, remove } = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses.history;

export default expensesSlice.reducer;