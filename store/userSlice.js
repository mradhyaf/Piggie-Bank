import { createSlice } from "@reduxjs/toolkit";
import { getUser, getUserId, updateDisplayName } from "../api/auth";
import { db } from "../api/firebase";
import optionalFunction from "../functions/optionalFunction";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    budget: null,
    categories: ["Food", "Transportation", "Others"],
    displayName: null,
    text: null,
  },
  reducers: {
    setBudgetState: (state, action) => {
      state.budget = action.payload;
    },
    setDisplayNameState: (state, action) => {
      state.displayName = action.payload;
    },
    setTextState: (state, action) => {
      state.text = action.payload;
    },
    addCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category !== action.payload
      );
    },
  },
});

const budgetRef = (uid) => db.ref("budget/" + uid);

export const setBudget = (budget, onComplete) => {
  return async (dispatch) => {
    const updates = {};
    updates[getUserId()] = budget;
    try {
      await budgetRef("").update(updates);
      dispatch(setBudgetState(budget));
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
      const budget = await budgetRef(uid).once("value");
      dispatch(setBudgetState(budget.val()));
      optionalFunction(onComplete)(null);
    } catch (error) {
      optionalFunction(onComplete)(error);
    }
  };
};

export const setDisplayName = (displayName, onComplete) => {
  return (dispatch) => {
    getUser()
      .updateProfile({ displayName })
      .then(() => {
        dispatch(setDisplayNameState(displayName));
        optionalFunction(onComplete)(null);
      })
      .catch((error) => {
        optionalFunction(onComplete)(error);
      });
  };
};

export const getDisplayName = (onComplete) => {
  return (dispatch) => {
    const user = getUser();
    if (user) dispatch(setDisplayNameState(user.displayName));
    optionalFunction(onComplete);
  };
};

export const { setBudgetState, setDisplayNameState, setTextState } = userSlice.actions;

export const selectBudget = (state) => state.user.budget;

export const selectDisplayName = (state) => state.user.displayName;

export const selectText = (state) => state.user.text;

export default userSlice.reducer;
