import React from 'react';
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from 'react-redux';

import { store } from './src/store'
import Navigator from "./src/Navigator";

export default function App() {
  return (
    <StoreProvider store={store} >
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </StoreProvider>
  );
}

