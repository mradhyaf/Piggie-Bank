import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AuthStack from './stacks/AuthStack';
import MainStack from './stacks/MainStack';
import LoadingScreen from './screens/LoadingScreen';
import { selectLoading, selectUserId } from './store/authSlice';

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
  let uid = useSelector(selectUserId);
  const isLoading = useSelector(selectLoading);

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <NavigationContainer theme={theme}>
      {uid ? (
        <MainStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}