import React, { useEffect, useState } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import AuthStack from './stacks/AuthStack';
import MainStack from './stacks/MainStack';
import LoadingScreen from './screens/LoadingScreen';
import { authSubscriber } from '../api/auth';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#084C61',
    background: '#FFF',
    card: '#FFD685',
    border: '#FFD685',
    text: '#323031',
  }
}

export default function Navigation () {
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const unsubscribe = authSubscriber(
      () => {
        setIsAuthorized(true);
        setIsLoading(false);
      },
      () => {
        setIsAuthorized(false);
        setIsLoading(false);
      }
    )
    return () => {
      unsubscribe();
    }
  })
  
  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <NavigationContainer theme={theme}>
      {isAuthorized ? (
        <MainStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}