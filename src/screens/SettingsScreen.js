import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import Screen from '../components/Screen'
import { getCurrentUser } from '../../api/auth'
import { clearExpense, getUserExpenses, uploadUserExpenses } from '../store/expensesSlice'
import { signOut, selectDisplayName, changeUserName } from '../store/authSlice'

export default function SettingsScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = React.useState('');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
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
    signOut()    
  }

  return (
    <Screen title="Settings" enableAppbar="true">
      {/* <Button
        onPress={handleClearExpenses}
      >CLEAR ALL EXPENSES</Button> */}
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
              <Button onPress={() => {dispatch(changeUserName(name));
                getCurrentUser().updateProfile({displayName: name}); hideDialog();}}>Done</Button>
              <Button onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
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
