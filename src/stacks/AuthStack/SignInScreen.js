import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Headline, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

import Screen from "../../components/Screen";
import { signInWithEmailAndPassword } from "../../../api/auth";
import { getExpenses } from "../../../store/expensesSlice";
import { getBudget, getDisplayName } from "../../../store/userSlice";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    setIsLoading(true);
    signInWithEmailAndPassword({ email, password }, (error) => {
      if (error) {
        setError(error);
      } else {
        dispatch(getBudget());
        dispatch(getExpenses());
        dispatch(getDisplayName());
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
        <Image source={require("../../../assets/app-logo.svg")} />
        Get insights from your monthly expenses
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

        <Text style={styles.reset} onPress={() => navigation.push("Recovery")}>
          Forgot password?
        </Text>

        <Button
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          mode={"contained"}
          onPress={handleSignIn}
          compact={true}
          loading={isLoading}
          disabled={isLoading}
        >
          LOG IN
        </Button>
      </View>

      <Text style={styles.bottomText}>
        Don't have an account?{" "}
        <Text style={styles.signUp} onPress={() => navigation.push("SignUp")}>
          Sign Up
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
    color: "#FFEEF2",
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
