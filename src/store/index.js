import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import userReducer from "./userSlice";
import expensesReducer from "./expensesSlice";

const reducers = combineReducers({
  user: userReducer,
  expenses: expensesReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
