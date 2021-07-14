import { createSlice } from "@reduxjs/toolkit";
import { getUserId, updateDisplayName } from "../api/auth";
import { db } from "../api/firebase";
import optionalFunction from "../functions/optionalFunction";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    budget: null,
    displayName: null,
  },
  reducers: {
    setBudget: (state, action) => {
      state.budget = action.payload;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
  },
});

export const setNewBudget = (budget, onComplete) => {
  return async (dispatch) => {
    try {
      await db.ref("budget/" + getUserId()).update(budget);
      dispatch(setNewBudget(budget));
      optionalFunction(onComplete)(null);
    } catch (error) {
      optionalFunction(onComplete)(error);
    }
  };
};

export const getBudget = (onComplete) => {
  return async (dispatch) => {
    const uid = getUserId();
    try {
      const budget = await expensesRef(uid).once("value");
      dispatch(setBudget(budget.val()));
      optionalFunction(onComplete)(null);
    } catch (error) {
      optionalFunction(onComplete)(error);
    }
  };
};

export const setNewDisplayName = (displayName, onComplete) => {
  return async (dispatch) => {
    try {
      updateDisplayName(displayName, dispatch(setDisplayName(displayName)));
      optionalFunction(onComplete)(null);
    } catch (error) {
      optionalFunction(onComplete)(error);
    }
  };
};

export const { setBudget, setDisplayName } = userSlice.actions;

export const selectBudget = (state) => state.user.budget;

export const selectDisplayName = (state) => state.user.displayName;

export default userSlice.reducer;
