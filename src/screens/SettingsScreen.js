import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import Screen from '../components/Screen'
import { signOut } from '../store/userSlice'

export default function OptionsScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  }

  return (
    <Screen title="Settings" enableAppbar="true">
      <Button
        onPress={handleSignOut}
      >LOG OUT</Button>
    </Screen>
  )
}
