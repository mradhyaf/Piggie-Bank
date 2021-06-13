import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { resetEmail, sendPasswordResetEmail } from '../../api/auth';

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');

  const handleReset = () => {
    sendPasswordResetEmail({ email }, 
      () => alert('Recovery email sent!') , 
      () => alert('Try again'));
  }

  return (
    <SafeAreaView style={styles.main}>
      <View>
        <Text>Reset</Text>
        <TextInput
          mode={'outlined'}
          style={styles.input}
          placeholder={'Email'}
          // ref={emailRef}
          value={email}
          onChangeText={setEmail}
        />
        <Button mode={'contained'} style={styles.input} onPress={handleReset}>
          SEND RESET EMAIL
        </Button>
        <Button mode={'contained'} style={styles.input}  onPress={() => navigation.push('SignIn')}>
          LOGIN PAGE
        </Button>
      </View>
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
    justifyContent: 'space-around',
    flex: 1,
    margin: 1
  }
})