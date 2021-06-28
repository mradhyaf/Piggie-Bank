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
    dispatch(getUserExpenses(
      () => alert('Expenses successfully updated'),
      (error) => alert(error.message)
    ));
  }

  const handleUploadExpenses = () => {
    dispatch(uploadUserExpenses(
      () => alert('Expenses successfully uploaded'),
      () => alert('Try again')
    ))
  }

  const handleSignOut = () => {
    dispatch(uploadUserExpenses(
      () => dispatch(signOut()),
      (error) => alert('Cannot safely sign out')
    ))
  }

  return (
    <Screen title="Settings" enableAppbar="true">
      {/* <Button
        onPress={handleClearExpenses}
      >CLEAR ALL EXPENSES</Button> */}
      <Button
        onPress={handleGetExpenses}
      >GET USER EXPENSES</Button>
      <Button
        onPress={handleUploadExpenses}
      >SAVE DATA TO CLOUD</Button>
      <Button
        onPress={handleSignOut}
      >LOG OUT</Button>
    </Screen>
  )
}
