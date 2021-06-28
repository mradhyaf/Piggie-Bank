import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import Screen from '../components/Screen'
import { clearExpense, getUserExpenses, uploadUserExpenses } from '../store/expensesSlice'
import { signOut } from '../store/authSlice'

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleClearExpenses = () => {
    dispatch(clearExpense());
  }

  const handleGetExpenses = () => {
    dispatch(getUserExpenses());
  }

  const handleUploadExpenses = () => {
    dispatch(uploadUserExpenses());
  }

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(clearExpense());
  }

  return (
    <Screen title="Settings" enableAppbar="true">
      <Button
        onPress={handleClearExpenses}
      >CLEAR ALL EXPENSES</Button>
      <Button
        onPress={handleGetExpenses}
      >GET USER EXPENSES</Button>
      <Button
        onPress={handleUploadExpenses}
      >UPLOAD EXPENSES</Button>
      <Button
        onPress={handleSignOut}
      >LOG OUT</Button>
    </Screen>
  )
}
