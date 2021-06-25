import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { signOut } from '../../api/auth'
import Screen from '../components/Screen'

export default function OptionsScreen({ navigation }) {
  const handleSignOut = () => {
    signOut(console.log, console.log);
  }

  return (
    <Screen title="Settings">
      <Button
        onPress={handleSignOut}
      >LOG OUT</Button>
    </Screen>
  )
}
