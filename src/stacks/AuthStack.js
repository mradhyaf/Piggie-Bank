import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PasswordResetScreen from "../screens/PasswordResetScreen";
const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Reset" component={PasswordResetScreen} />
    </Stack.Navigator>
  )
}
