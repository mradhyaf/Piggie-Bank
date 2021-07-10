import React from 'react'
import { View, Text } from 'react-native'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'

export default function TestScreen() {
  return (
    <View>
      <Text>PLEASE RENDER</Text>
      <ExpenseForm />
      <ExpenseList />
    </View>
  )
}
