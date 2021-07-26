import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button, Headline } from "react-native-paper";
import { useDispatch } from "react-redux";

import { signUpWithEmailAndPassword } from "../../../api/auth";
import { getExpenses } from "../../../store/expensesSlice";
import Screen from "../../components/Screen";

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    setIsLoading(true);
    signUpWithEmailAndPassword({ username, email, password }, (error) => {
      if (error) {
        setError(error);
      } else {
        dispatch(getBudget());
        dispatch(getExpenses());
        dispatch(setDisplayName(username));
      }
      setIsLoading(false);
    });
  };

  const secureText = () => {
    visible ? setVisible(false) : setVisible(true);
  };

  return (
    <Screen style={styles.container}>
      <Headline style={styles.headline}>
        Start tracking your expenses today
      </Headline>
      <View style={styles.form}>
        {error && <Text style={styles.error}>{error.message}</Text>}
        <TextInput
          style={styles.input}
          placeholder={"Username"}
          textContentType={"name"}
          value={username}
          onChangeText={setUsername}
          mode="outlined"
        />
        <TextInput
          style={styles.input}
          placeholder={"Email"}
          textContentType={"emailAddress"}
          value={email}
          onChangeText={setEmail}
          mode="outlined"
        />
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          textContentType={"password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={visible}
          mode="outlined"
          right={
            <TextInput.Icon
              style={styles.eyecon}
              name="eye"
              onPress={secureText}
            />
          }
        />
        <Button
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          mode={"contained"}
          onPress={handleSignUp}
          compact={true}
          loading={isLoading}
          disabled={isLoading}
        >
          SIGN UP
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
    marginHorizontal: "2%",
    marginVertical: 2,
  },
  form: {
    flex: 16,
    paddingHorizontal: "10%",
  },
  input: {
    marginVertical: 5,
  },
  reset: {
    color: "#3498db",
    textAlign: "right",
    marginHorizontal: "2%",
    marginVertical: 2,
  },
  button: {
    justifyContent: "center",
    marginHorizontal: "10%",
    marginVertical: 5,
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
