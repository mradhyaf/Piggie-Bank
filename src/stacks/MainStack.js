import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'

import ExpensesScreen from '../screens/ExpensesScreen';
import HomeScreen from '../screens/HomeScreen';
import OptionsScreen from '../screens/OptionsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ScreenWrapper from '../components/Screen';

const BottomTab = createBottomTabNavigator();

const screens =[
  {name: "Home", component: HomeScreen},
  {name: "Expenses", component: ExpensesScreen},
  {name: "Statistics", component: StatisticsScreen},
  {name: "Options", component: OptionsScreen},
]

export default () => {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      {screens.map(scr => (
        <BottomTab.Screen name={scr.name} component={ScreenWrapper(scr.component)} />
      ))}
    </BottomTab.Navigator>
  )
}