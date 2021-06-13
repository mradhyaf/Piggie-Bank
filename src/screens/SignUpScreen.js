import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getCurrentUserId, isSignedIn, signIn, signUp } from '../../api/auth';

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(true);

  const handleSignUp = () => {
    const userDetails = { email: email, password: password };
    signUp(userDetails, () => navigation.navigate("Expenses"), alert);
    console.log('Sign Up pressed');
    console.log(getCurrentUserId());
  }

  const secureText =() => {
      visible ?  setVisible(false) : setVisible(true);
  }

  return (
    <SafeAreaView style={styles.main}>
      <View>
        <Text>Sign Up Page</Text>
        <TextInput
          mode={'outlined'}
          style={styles.input}
          placeholder={'Email'}
          // ref={emailRef}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          mode={'outlined'}
          style={styles.input}
          placeholder={'Password'}
          // ref={passwordRef}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={visible}
          right={<TextInput.Icon name="eye" onPress={secureText}/>}
        />
        <Button mode={'contained'} style={styles.button} onPress={handleSignUp}>
          SIGN UP
        </Button>
        <Button mode={'contained'} style={styles.button} onPress={() => navigation.push('SignIn')}>
          LOGIN PAGE
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  input: {
    justifyContent: 'space-around',
    flex: 1,
    margin: 1
  },
  button: {
    justifyContent: 'space-around',
    flex: 1,
    margin: 1
  }
})