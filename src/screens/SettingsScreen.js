import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import Screen from '../components/Screen'
import { clear } from '../store/expensesSlice'
import { signOut } from '../store/userSlice'

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleClearExpenses = () => {
    dispatch(clear());
  }

  const handleSignOut = () => {
    dispatch(signOut());
  }

  return (
    <Screen title="Settings" enableAppbar="true">
      <Button
        onPress={handleClearExpenses}
      >CLEAR ALL EXPENSES</Button>
      <Button
        onPress={handleSignOut}
      >LOG OUT</Button>
    </Screen>
  )
}
