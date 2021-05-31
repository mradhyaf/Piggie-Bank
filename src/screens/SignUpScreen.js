import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View, Text, TextInput, Button } from 'react-native';
import { getCurrentUserId, isSignedIn, signIn, signUp } from '../../api/auth';

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = () => {
    const userDetails = { email: email, password: password };
    signUp(userDetails, console.error);
    signIn(userDetails, console.error);
    console.log('Sign Up pressed');
    console.log(getCurrentUserId());
    if(isSignedIn()) {
      navigation.navigate("Expenses")
     } else {
      console.log("Try Again or Try Logging in from Log in screen");
     }   
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
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingValue: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  input: {
    height: 100,
    width: 400,
  }
})