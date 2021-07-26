import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button, Headline } from "react-native-paper";

import { sendPasswordResetEmail } from "../../../api/auth";
import Screen from "../../components/Screen";

export default function SignUp({ navigation }) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const handleRecovery = () => {
    sendPasswordResetEmail(email, (error) => {
      if (error) setError(error.message);
    });
  };

  return (
    <Screen style={styles.container}>
      <Headline style={styles.headline}>
        Forgot your password? Send a recovery email.
      </Headline>
      <View style={styles.form}>
        {error && <Text style={styles.error}>{error.message}</Text>}
        <TextInput
          style={styles.input}
          placeholder={"Email"}
          textContentType={"emailAddress"}
          value={email}
          onChangeText={setEmail}
          mode="outlined"
        />
        <Button
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          mode={"contained"}
          onPress={handleRecovery}
          compact={true}
        >
          SEND
        </Button>
      </View>
      <Text style={styles.bottomText}>
        Already have an account?{" "}
        <Text style={styles.signUp} onPress={navigation.goBack}>
          Sign In
        </Text>
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
  },
  headline: {
    flex: 6,
    paddingLeft: 20,
    paddingTop: 20,
  },
  error: {
    color: "red",
    margin: "2%",
  },
  form: {
    flex: 16,
    paddingHorizontal: "10%",
  },
  input: {
    marginVertical: "1.5%",
  },
  button: {
    justifyContent: "center",
    marginHorizontal: "10%",
    marginVertical: "3%",
    borderRadius: 28,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    paddingHorizontal: "20%",
    paddingVertical: 0,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 20,
  },
  bottomText: {
    flex: 2,
    textAlign: "center",
  },
  signUp: {
    fontWeight: "bold",
    color: "#3498db",
  },
});
