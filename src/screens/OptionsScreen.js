import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { signOut } from '../../api/auth'

export default function OptionsScreen({ navigation }) {
  const handleSignOut = () => {
    signOut(console.log, console.log);
  }

  return (
    <View>
      <Button
        onPress={handleSignOut}
      >LOG OUT</Button>
    </View>
  )
}
