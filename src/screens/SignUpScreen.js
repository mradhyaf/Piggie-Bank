import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, Headline } from 'react-native-paper';

import { signUp } from '../../api/auth';
import Screen from '../components/Screen';

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(true);

  const handleSignUp = () => {
    const userDetails = { email: email, password: password };
    signUp(userDetails, console.log, alert);
  }

  const secureText =() => {
      visible ?  setVisible(false) : setVisible(true);
  }

  return (
    <Screen style={styles.container}>
      <Headline style={styles.headline}>Get insights from your monthly expenses</Headline>
      <View style={styles.form}>
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
        <Button style={styles.button} contentStyle={styles.buttonContent} labelStyle={styles.buttonLabel} mode={'contained'} onPress={handleSignUp} compact={true}>
          SIGN UP
        </Button>
      </View>
      <Text style={styles.bottomText}>
        Already have an account? <Text style={styles.signUp} onPress={() => navigation.push('SignIn')}>Sign In</Text>
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