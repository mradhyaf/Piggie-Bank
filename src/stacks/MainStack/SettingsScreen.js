import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import Screen from '../../components/Screen'
import { signOut } from '../../../api/auth'
import { clear as clearExpenses } from '../../../store/expensesSlice'
import { setNewDisplayName } from '../../../store/userSlice'

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  
  // Set user displayName
  const [name, setName] = useState('');
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const handleSetUsername = () => {
    dispatch(setNewDisplayName(
      name,
      (error) => error ? alert(error.message) : hideDialog()
    ));
  }

  const handleSignOut = () => {
    signOut(
      error => { if (!error) dispatch(clearExpenses()); }
    );
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
