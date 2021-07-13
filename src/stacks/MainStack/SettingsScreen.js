import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'

import Screen from '../../components/Screen'
import { signOut, updateProfile } from '../../../api/auth'

export default function SettingsScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  
  // Set user displayName
  const [name, setName] = useState('');
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const handleSetUsername = () => {
    updateProfile(
      { displayName: name },
      (error) => error ? alert(error) : hideDialog()
    );
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <Screen title="Settings" enableAppbar="true">
      <View>
        <Button onPress={showDialog}>Change Username</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>New Username</Dialog.Title>
            <Dialog.Content>
              <TextInput placeholder={'Username'}
                value={name}
                mode='outlined'
                onChangeText={(name) => setName(name)}/>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleSetUsername}>Done</Button>
              <Button onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <Button
        onPress={handleSignOut}
      >LOG OUT</Button>
    </Screen>
  )
}
