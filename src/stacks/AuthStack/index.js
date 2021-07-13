import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import RecoveryScreen from './RecoveryScreen';

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
