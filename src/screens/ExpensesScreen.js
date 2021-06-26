import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import Screen from '../components/Screen';

export default function ExpensesScreen({ navigation }) {
  return (
    <Screen title="Expenses" enableAppbar={true}>
      <AddExpenseForm />
      <ExpenseList />
    </Screen>
  )
}