import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import { View, Text } from 'react-native'

import ExpensesScreen from '../screens/ExpensesScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import PieChartScreen from '../screens/PieChartScreen';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator initialRouteName="Expenses">
      <Drawer.Screen name="Expenses" component={ExpensesScreen} />
      <Drawer.Screen name="Bar Chart" component={StatisticsScreen} />
      <Drawer.Screen name="Pie Chart" component={PieChartScreen} />
    </Drawer.Navigator>
  )
}