import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View, Text, Button } from 'react-native';

export default function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={styles.main}>
      <Text>login</Text>
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
  }
})