import React from 'react';
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/store'
import Navigator from "./src/Navigator";
import LoadingScreen from './src/screens/LoadingScreen';

export default function App() {
  return (
    <StoreProvider store={store} >
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <PaperProvider>
          <Navigator />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}

