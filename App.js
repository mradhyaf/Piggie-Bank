import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View } from 'react-native';
import ExpensesScreen from './src/screens/ExpensesScreen';

export default function App() {
  const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  return (
    <SafeAreaView style={[styles.main, { paddingTop: paddingValue }]}>
      <ExpensesScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
  }
})