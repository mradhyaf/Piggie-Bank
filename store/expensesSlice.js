import { createSlice } from "@reduxjs/toolkit";
import { db } from "../api/firebase";
import { getUserId } from "../api/auth";
import optionalFunction from "../functions/optionalFunction";

export const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    history: [],
  },
  reducers: {
    update: (state, action) => {
      state.history = action.payload;
    },
    clear: (state) => {
      state.history = [];
    },
  },
});

const expensesRef = (uid) => db.ref("expenses/" + uid);

export const addExpense = (expense, onComplete) => {
  return async (dispatch, getState) => {
    const uid = getUserId();
    try {
      const newExpense = expensesRef(uid).push();
      await newExpense.set({ ...expense, key: newExpense.key });
      await dispatch(getExpenses());
      optionalFunction(onComplete)(null);
    } catch (error) {
      optionalFunction(onComplete)(error);
    }
  };
};

export const deleteExpense = (expenseKey, onComplete) => {
  return async (dispatch, getState) => {
    const uid = getUserId();
    try {
      await expensesRef(uid).child(expenseKey).remove();
      await dispatch(getExpenses());
      optionalFunction(onComplete)(null);
    } catch (error) {
      optionalFunction(onComplete)(error);
    }
  };
};

export const getExpenses = () => {
  return async (dispatch, getState) => {
    const uid = getUserId();
    try {
      const expenses = await expensesRef(uid).once("value");
      console.log(expense);
      dispatch(update(Object.values(expenses.val())));
    } catch (error) {
      console.error(error);
    }
  };
};

export const { update, clear } = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses.history;

export default expensesSlice.reducer;
