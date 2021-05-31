import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import ExpensesScreen from './Screens/ExpensesScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUp from './Screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  return (
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Expenses" component={ExpensesScreen} options={{headerLeft: null}}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
  );
}

const Stack = createStackNavigator();
