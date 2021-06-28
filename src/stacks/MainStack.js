import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ExpensesStack from './ExpensesStack';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions ={{
        labelPosition: 'below-icon'
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name='home' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesStack}
        options={{
          title: "Expenses",
          tabBarLabel: "Expenses",
          tabBarIcon: ({ color }) => (
            <Icon name='money-bill-wave' color={color} size={24} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: "Statistics",
          tabBarLabel: "Statistics",
          tabBarIcon: ({ color }) => (
            <Icon name='chart-line' color={color} size={24} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Icon name='sliders-h' color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}