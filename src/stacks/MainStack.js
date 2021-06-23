import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import { View, Text } from 'react-native'

import ExpensesScreen from '../screens/ExpensesScreen';
import SummaryScreen from '../screens/SummaryScreen';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator initialRouteName="Expenses">
      <Drawer.Screen name="Expenses" component={ExpensesScreen} />
      <Drawer.Screen name="Charts" component={SummaryScreen} />
    </Drawer.Navigator>
  )
}