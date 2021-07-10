import React from 'react'
import { Button } from 'react-native-paper'
import { signOut } from '../../api/auth'

import Screen from '../components/Screen'

export default function SettingsScreen({ navigation }) {
  const handleSignOut = () => {
    signOut()    
  }

  return (
    <Screen title="Settings" enableAppbar="true">
      <Button
        onPress={handleSignOut}
      >LOG OUT</Button>
    </Screen>
  )
}
