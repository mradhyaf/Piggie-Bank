import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { View, Text } from 'react-native'

import ExpensesScreen from '../screens/ExpensesScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Expenses">
      <Stack.Screen name="Expenses" component={ExpensesScreen} options={{headerLeft: null}}/>
    </Stack.Navigator>
  )
}