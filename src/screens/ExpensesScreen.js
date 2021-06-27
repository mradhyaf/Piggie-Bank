import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import ExpenseList from '../components/ExpenseList';
import Screen from '../components/Screen';
import PieChart from '../components/PieChart';

export default function ExpensesScreen({ navigation }) {
  return (
    <Screen title="Expenses" enableAppbar={true}>
      {/* <PieChart /> */}
      <ExpenseList />
    </Screen>
  )
}