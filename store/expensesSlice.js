import { createSlice } from '@reduxjs/toolkit';
import { db } from '../api/firebase';
import { getUserId  } from '../api/auth'; 
import optionalFunction from '../functions/optionalFunction';

const expensesRef = (uid) => db.ref('expenses/' + uid);

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    history: []
  },
  reducers: {
    update: (state, action) => {
      state.history = action.payload;      
    },
    clear: state => {
      state.history = {};
    }
  }
});

export const addExpense = (expense, onComplete) => {
  return async (dispatch, getState) => {
    const uid = getUserId();
    try {
      const newExpense = expensesRef(uid).push();
      await newExpense.set({ ...expense, key: newExpense.key });
      await dispatch(success());
      optionalFunction(onComplete)(null);
    } catch (error) {
      optionalFunction(onComplete)(error);
    }
  }
}

export const deleteExpense = (expenseKey, onComplete) => {
  return async (dispatch, getState) => {
    const uid = getUserId();
    try {
      await expensesRef(uid).child(expenseKey).remove();
      await dispatch(success());
      optionalFunction(onComplete)(null);
    } catch (error) {
      optionalFunction(onComplete)(error);
    }
  }
}

export const success = () => {
  return async (dispatch, getState) => {
    const uid = getUserId();
    try {
      const expenses = await expensesRef(uid).once('value');
      dispatch(update(Object.values(expenses.val())));
    } catch (error) {
      console.error(error);
    }
  }
}

export const { 
  update, 
  clear
} = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses.history;

export default expensesSlice.reducer;