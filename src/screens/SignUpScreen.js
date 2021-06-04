import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

import { signUp } from '../../api/auth';

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = () => {
    const userDetails = { email: email, password: password };
    signUp(userDetails, () => alert('Successfully Signed Up'), alert);
  }

  return (
    <SafeAreaView style={styles.main}>
      <Text>Sign Up</Text>
      <TextInput
          style={[styles.input, { backgroundColor: 'green' }]}
          placeholder={'Email'}
          // ref={emailRef}
          value={email}
          onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { backgroundColor: 'yellow' }]}
        placeholder={'Password'}
        // ref={passwordRef}
        value={password}
        onChangeText={setPassword}
      />
      <Button
         title="SIGN UP"
         onPress={handleSignUp}
        />      
      {/* <Button
         title="Go to Expenses"
         onPress={() => navigation.navigate('Expenses')}
       /> */}
      <Button
        title="LOG IN"
        onPress={() => navigation.push('SignIn')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  input: {
    height: 100,
    width: 300,
  }
})