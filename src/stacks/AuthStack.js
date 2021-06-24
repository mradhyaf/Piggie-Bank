import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';

const Stack = createStackNavigator();

const screens =[
  {name: "SignIn", component: SignInScreen},
  {name: "SignUp", component: SignUpScreen},
  {name: "Reset", component: PasswordResetScreen},
]

export default () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" headerMode="none" >
      {screens.map(scr => (
        <Stack.Screen name={scr.name} component={scr.component} />
      ))}
    </Stack.Navigator>
  )
}
