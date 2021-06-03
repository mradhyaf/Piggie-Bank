import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View, Text } from 'react-native';
import { Button, Headline, TextInput } from 'react-native-paper';
import { signIn, getCurrentUserId, isSignedIn } from '../../api/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const emailRef = React.useRef('');
  // const passwordRef = React.useRef('');

  const handleSignIn = () => {
    const userDetails = { email: email, password: password };
    signIn(userDetails, () => navigation.navigate("Expenses"), alert);
    console.log('Sign In pressed');
    console.log(getCurrentUserId());
  }

  return (
    <SafeAreaView style={styles.main}>
      <View>
        <Headline>Get insights from your monthly expenses</Headline>
      </View>
      <View>
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
        />
        <Button mode={'contained'} style={styles.button} onPress={handleSignIn}>
          LOG IN
        </Button>      
        <Button mode={'contained'} style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          CREATE AN ACCOUNT
        </Button>
        <Button mode={'contained'} style={styles.button} onPress={() => navigation.navigate('Reset')}>
          RESET PASSWORD
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
    flex: 1,
    justifyContent: 'space-around',
    padding: 5
  },
  button: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 5
  }
})