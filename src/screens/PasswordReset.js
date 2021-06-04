import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { resetEmail } from '../../api/auth';

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');

  const sendReset = () => {
    const userDetails = { email: email };
    resetEmail(userDetails);
    console.log('Reset mail sent');
  }

  return (
    <SafeAreaView style={styles.main}>
      <Text>Reset</Text>
      <TextInput
          style={[styles.input, { backgroundColor: 'green' }]}
          placeholder={'Email'}
          // ref={emailRef}
          value={email}
          onChangeText={setEmail}
      />
      <Button
         title="SEND RESET EMAIL"
         onPress={sendReset}
        />
      <Button
        title="LOGIN PAGE"
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
    padding: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  input: {
    height: 100,
    width: 300,
  }
})