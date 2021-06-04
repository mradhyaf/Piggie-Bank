import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, Text, View } from 'react-native';
import { Button, Headline, TextInput } from 'react-native-paper';

import { signIn } from '../../api/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignIn = () => {
    const userDetails = { email: email, password: password };
    signIn(userDetails, () => alert("Successfully logged in"), alert);
  }

  return (
    // <SafeAreaView style={styles.main}>
    //   <View style={styles.headline}>
    //     <Headline>Get insights from your monthly expenses</Headline>
    //   </View>
    //   <View style={styles.inputs}>
    //     <TextInput
    //         mode={'outlined'}
    //         style={styles.input}
    //         placeholder={'Email'}
    //         value={email}
    //         onChangeText={setEmail}
    //     />
    //     <TextInput
    //       mode={'outlined'}
    //       style={styles.input}
    //       placeholder={'Password'}
    //       value={password}
    //       onChangeText={setPassword}
    //       secureTextEntry={true}
    //     />
    //   </View>
    //   <View style={styles.buttons}>
    //     <Button mode={'contained'} style={styles.button} onPress={handleSignIn}>
    //       LOG IN
    //     </Button>      
    //     <Button mode={'contained'} style={styles.button} onPress={() => navigation.push('SignUp')}>
    //       CREATE AN ACCOUNT
    //     </Button>
    //     <Button mode={'contained'} style={styles.button} onPress={() => navigation.push('Reset')}>
    //       RESET PASSWORD
    //     </Button>
    //   </View>
    // </SafeAreaView>
    <Text>Hello</Text>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headline: {
    flex: 1,
  },
  inputs: {
    flex: 4,
  },
  buttons: {
    flex: 4,
  },
  input: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 1
  },
  button: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 5
  }
})