import { createSlice } from '@reduxjs/toolkit';
import { expensesRef } from '../../api/expenses';

const initialState = {
  history: [],
  // food: [],
  // transportation: [],
  // utilities: [],
  // personal: [],
  // others: [],
  error: '',
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
    },
    getExpensesFail: (state, action) => {
      state.error = action.payload;
    },
    uploadExpensesFail: state => {
      state.error = action.payload;
    }
  }
});

export const getUserExpenses = () => {
  return async (dispatch, getState) => {
    try {
      const uid = getState().user.currentUser.uid;
      const snapshot = await expensesRef.child(uid).get();
      const expenses = Object.values(snapshot.val());
      return dispatch(update(expenses))
    } catch (error) {
      return dispatch(getExpensesFail(error))
    }
  }
}

export const uploadUserExpenses = () => {
  return async (dispatch, getState) => {
    try {
      const uid = getState().user.currentUser.uid;
      const expenses = getState().expenses.history;
      const updates = Object.assign({}, expenses);
      await expensesRef.child(uid).update(updates);
    } catch (error) {
      return dispatch(updateExpensesFail(error));
    } 
  }
}

export const { 
  add, 
  update, 
  remove, 
  clear,
  getExpensesFail,
  updateExpensesFail
} = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses.history;

export default expensesSlice.reducer;