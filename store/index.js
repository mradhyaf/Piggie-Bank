import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from 'redux';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import authReducer from "./authSlice";
import expensesReducer from "./expensesSlice";
import settingsReducer from "./settingsSlice";

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth']
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['loading']
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  expenses: expensesReducer,
  settings: settingsReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);
