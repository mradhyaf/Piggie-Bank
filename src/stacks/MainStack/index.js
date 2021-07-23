import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import OCR from "./OCRStack";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import ExpensesStack from "./ExpensesStack";

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        labelPosition: "below-icon",
      }}
    >
      <Tab.Screen
        name="OCR"
        component={OCR}
        options={{
          title: "OCR",
          tabBarLabel: "OCR",
          tabBarIcon: ({ color }) => (
            <Icon name="camera" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={24} />
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
            <Icon name="money-bill-wave" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Icon name="sliders-h" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
