import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AuthStack from './stacks/AuthStack';
import MainStack from './stacks/MainStack';
import LoadingScreen from './screens/LoadingScreen';
import { selectLoading, selectUserId } from './store/authSlice';

export default function Navigation () {
  let uid = useSelector(selectUserId);
  const isLoading = useSelector(selectLoading);

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <NavigationContainer>
      {uid ? (
        <MainStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}