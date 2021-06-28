import { createSlice } from '@reduxjs/toolkit';
import { expensesRef } from '../../api/expenses';

const initialState = {
  history: [],
  // food: [],
  // transportation: [],
  // utilities: [],
  // personal: [],
  // others: [],
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
    delete: (state, action) => {
      state.history = state.history.filter(expense => expense.key !== action.payload)
    },
    clear: state => {
      state.history = [];
    }
  }
});

export const getUserExpenses = (onSuccess, onError) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.currentUser.uid;
    expensesRef.child(uid).get()
      .then(snapshot => {
        const expenses = Object.values(snapshot.val());
        dispatch(updateExpense(expenses))
        return onSuccess()
      }).catch(error => {
        return onError(error);
      })
  }
}

export const uploadUserExpenses = (onSuccess, onError) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.currentUser.uid;
    const expenses = getState().expenses.history;
    const updates = Object.assign({}, expenses);
    expensesRef.child(uid).update(updates)
      .then(() => {
        return onSuccess();
      }).catch(error => {
        return onError(error);
      })
  }
}

export const { 
  add: addExpense, 
  update: updateExpense, 
  delete: deleteExpense, 
  clear: clearExpense,
} = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses.history;

export default expensesSlice.reducer;