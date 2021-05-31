import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View, Text, Button, TextInput } from 'react-native';
import { signIn, getCurrentUserId, isSignedIn } from '../../api/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const emailRef = React.useRef('');
  // const passwordRef = React.useRef('');

  const handleSignIn = () => {
    const userDetails = { email: email, password: password };
    signIn(userDetails, console.error);
    console.log('Sign In pressed');
    console.log(getCurrentUserId());
    if(isSignedIn()) {
      navigation.navigate("Expenses")
     } else {
      console.log("Wrong Credentials");
     }   
  }

  return (
    <SafeAreaView style={styles.main}>
      <Text>login</Text>
      <TextInput
          style={[styles.input, { backgroundColor: 'green' }]}
          placeholder={'Username'}
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
         title="LOG IN"
         onPress={handleSignIn}
        />      
      <Button
         title="Go to Expenses"
         onPress={() => navigation.navigate('Expenses')}
       />
      <Button
        title="Go to SignUp"
        onPress={() => navigation.navigate('SignUp')}
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