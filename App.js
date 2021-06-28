import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/store'
import Navigator from "./src/Navigator";
import LoadingScreen from './src/screens/LoadingScreen';

const theme = {
  ...DefaultTheme,
  roundness: 20,
  colors: {
    ...DefaultTheme.colors,
    primary: '#084C61',
    accent: '#177E89',
    background: '#E9D8A6',
    surface: '#FFD685',
    text: '#323031',
  }
}

export default function App() {
  return (
    <StoreProvider store={store} >
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <PaperProvider theme={theme} >
          <Navigator />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}

