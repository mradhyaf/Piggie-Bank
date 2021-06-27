import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View, Text } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import { resetEmail, sendPasswordResetEmail } from '../../api/auth';
import Screen from '../components/Screen';

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');

  const handleReset = () => {
    sendPasswordResetEmail({ email },
      () => alert('Recovery email sent!') ,
      () => alert('Try again'));
  }

  return (
    // <SafeAreaView style={styles.main}>
    //   <View>
    //     <Text>Reset</Text>
    //     <TextInput
    //       mode={'outlined'}
    //       style={styles.input}
    //       placeholder={'Email'}
    //       // ref={emailRef}
    //       value={email}
    //       onChangeText={setEmail}
    //     />
    //     <Button mode={'contained'} style={styles.input} onPress={handleReset}>
    //       SEND RESET EMAIL
    //     </Button>
    //     <Button mode={'contained'} style={styles.input}  onPress={() => navigation.push('SignIn')}>
    //       LOGIN PAGE
    //     </Button>
    //   </View>
    // </SafeAreaView>
    <Screen style={styles.container}>
      <Headline style={styles.headline}>Forgot your password?
        Send a recovery email.
      </Headline>
      <View style={styles.form}>
        <TextInput
            style={styles.input}
            placeholder={'Email'}
            textContentType={'emailAddress'}
            value={email}
            onChangeText={setEmail}
        />
        <Button 
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          mode={'contained'}
          onPress={handleReset}
          compact={true}
        >SEND</Button>
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