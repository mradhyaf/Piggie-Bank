import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

import Screen from "../../components/Screen";
import { signOut } from "../../../api/auth";
import { clear as clearExpenses } from "../../../store/expensesSlice";
import { setDisplayName } from "../../../store/userSlice";

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  // Set user displayName
  const [name, setName] = useState("");
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const handleSetUsername = () => {
    dispatch(
      setDisplayName(name, (error) =>
        error ? alert(error.message) : hideDialog()
      )
    );
  };

  const handleSignOut = () => {
    signOut((error) => {
      if (!error) dispatch(clearExpenses());
    });
  };

  return (
    <Screen title="Settings" enableAppbar="true" style={styles.container}>
      <View>
        <Button onPress={showDialog}>Change Username</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>New Username</Dialog.Title>
            <Dialog.Content>
              <TextInput
                placeholder={"Username"}
                value={name}
                mode="outlined"
                onChangeText={(name) => setName(name)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleSetUsername}>Done</Button>
              <Button onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <Button
        mode="contained"
        style={styles.logout}
        contentStyle={styles.logoutButtonContent}
        labelStyle={styles.logoutButtonLabel}
        onPress={handleSignOut}
      >
        LOG OUT
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  logout: {
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: "10%",
  },
  logoutButtonContent: {
    backgroundColor: "#ef233c",
  },
  logoutButtonLabel: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
