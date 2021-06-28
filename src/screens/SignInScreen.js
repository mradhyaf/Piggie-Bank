import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import Screen from '../components/Screen';
import { getUserExpenses } from '../store/expensesSlice';
import { signIn } from '../store/authSlice';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);

  const handleSignIn = () => {
    dispatch(signIn(
      {email, password},
      () => dispatch(getUserExpenses(
        () => console.log("User expenses updated"),
        console.error)),
      setError
    ))
  }

  const secureText =() => {
    visible ? setVisible(false) : setVisible(true);
  }

  return (
    <Screen style={styles.container}>
      <Headline style={styles.headline}>Get insights from your monthly expenses</Headline>
      <View style={styles.form}>
        {error && <Text style={styles.error}>
          {error.message}
        </Text>}
        <TextInput
            style={styles.input}
            placeholder={'Email'}
            textContentType={'emailAddress'}
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder={'Password'}
          textContentType={'password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={visible}
          right={<TextInput.Icon style={styles.eyecon} name="eye" onPress={secureText}/>}
        />
        <Text style={styles.reset} onPress={() => navigation.push('Recovery')}>
          Forgot password?
        </Text>
        <Button 
          style={styles.button} 
          contentStyle={styles.buttonContent} 
          labelStyle={styles.buttonLabel} 
          mode={'contained'} 
          onPress={handleSignIn} 
          compact={true}
        >LOG IN</Button>
      </View>
      <Text style={styles.bottomText}>
        Don't have an account? <Text style={styles.signUp} onPress={() => navigation.push('SignUp')}>Sign Up</Text>
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  headline: {
    flex: 6
  },
  error: {
    color: 'red',
    margin: '2%'
  },
  form: {
    flex: 16,
    paddingHorizontal: '10%',
  },
  input: {
    marginVertical: '1.5%',
    height: 56,
  },
  reset: {
    color: '#3498db',
    textAlign: 'right',
    margin: '2%'
  },
  button: {
    justifyContent: 'center',
    marginHorizontal: '10%',
    marginVertical: '3%',
    borderRadius: 28,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    paddingHorizontal: '20%',
    paddingVertical: '0%',
  },
  bottomText: {
    flex: 2,
    textAlign: 'center',
  },
  signUp: {
    fontWeight: 'bold',
    color: '#3498db',
  }
})