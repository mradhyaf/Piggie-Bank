import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import AuthStack from './stacks/AuthStack';
import MainStack from './stacks/MainStack';
import LoadingScreen from './screens/LoadingScreen';
import { selectCurrentUser, selectIsLoading, signIn, signOut } from './store/authSlice';
import { addAuthListener } from '../api/auth';

export default function Navigation () {
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectIsLoading)
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = addAuthListener(
      ({ displayName, email, photoURL, uid }) => dispatch(signIn({ displayName, email, photoURL, uid })),
      () => dispatch(signOut()));
    return authListener;
  }, [])

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }
  return (
    <NavigationContainer>
      {currentUser ? (
        <MainStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}