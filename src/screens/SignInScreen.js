import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View } from 'react-native';
import { Button, Headline, TextInput } from 'react-native-paper';

import { signIn } from '../../api/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(true);

  const handleSignIn = () => {
    const userDetails = { email: email, password: password };
    signIn(userDetails, console.log, alert);
  }

  const secureText =() => {
    visible ? setVisible(false) : setVisible(true);
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
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
          mode={'outlined'}
          style={styles.input}
          placeholder={'Password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={visible}
          right={<TextInput.Icon name="eye" onPress={secureText}/>}
        />
        <Button mode={'contained'} style={styles.button} onPress={handleSignIn}>
          LOG IN
        </Button>      
        <Button mode={'contained'} style={styles.button} onPress={() => navigation.push('SignUp')}>
          CREATE AN ACCOUNT
        </Button>
        <Button mode={'contained'} style={styles.button} onPress={() => navigation.push('Reset')}>
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
    margin: 1
  },
  button: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 1
  }
})