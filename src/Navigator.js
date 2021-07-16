import React, { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";
import LoadingScreen from "./screens/LoadingScreen";
import { authSubscriber } from "../api/auth";

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF92C2",
    background: "#FFFFFF",
    card: "#FFFFFF",
    border: "#FFEEF2",
    text: "#595758",
  },
};

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);

  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const unsubscribe = authSubscriber((user) => {
      user ? setIsAuthorized(true) : setIsAuthorized(false);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={navigatorTheme}>
      {isAuthorized ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
