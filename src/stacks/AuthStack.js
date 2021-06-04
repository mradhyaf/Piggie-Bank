import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}
