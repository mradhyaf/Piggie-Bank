import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [],
  food: [],
  transportation: [],
  utilities: [],
  personal: [],
  others: [],
}

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    add: (state, action) => {
      state.history = [...state.history, action.payload];
    },
    update: (state, action) => {
      state.history = [...state.history, ...action.payload];
    },
    remove: (state, action) => {
      state.history = state.history.filter(expense => expense.key !== action.payload)
    },
    clear: state => {
      state.history = [];
    }
  }
});

export const { add, update, remove, clear } = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses.history;

export default expensesSlice.reducer;