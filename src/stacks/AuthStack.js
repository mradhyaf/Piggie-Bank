import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" headerMode="none" >
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Reset" component={PasswordResetScreen} />
    </Stack.Navigator>
  )
}
