import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import RecoveryScreen from '../screens/RecoveryScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" headerMode="none" >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Recovery" component={RecoveryScreen} />
    </Stack.Navigator>
  )
}
