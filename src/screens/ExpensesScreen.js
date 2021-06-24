import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';

export default function ExpensesScreen({ navigation }) {
  return (
    <View>
      <AddExpenseForm />
      <ExpenseList />
      <Button onPress={() => navigation.navigate('Home')}>DRAWER</Button>
    </View>
  )
}