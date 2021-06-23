import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import { View, Text } from 'react-native'

import ExpensesScreen from '../screens/ExpensesScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator initialRouteName="Expenses">
      <Drawer.Screen name="Expenses" component={ExpensesScreen} />
      <Drawer.Screen name="Statistics" component={StatisticsScreen} />
    </Drawer.Navigator>
  )
}