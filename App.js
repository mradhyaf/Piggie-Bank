import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ExpensesScreen from './src/screens/ExpensesScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUp from './src/screens/SignUpScreen';
import Reset from './src/screens/PasswordReset';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Expenses" component={ExpensesScreen} options={{headerLeft: null}}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Reset" component={Reset} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const Stack = createStackNavigator();
