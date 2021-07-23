import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";
import Navigator from "./src/Navigator";
import LoadingScreen from "./src/screens/LoadingScreen";

const paperTheme = {
  ...DefaultTheme,
  roundness: 20,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF92C2",
    accent: "#177E89",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    text: "#595758",
  },
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <PaperProvider theme={paperTheme}>
          <Navigator />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
