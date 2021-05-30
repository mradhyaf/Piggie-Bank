import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View, Text } from 'react-native';

export default function SignUp() {
  return (
    <SafeAreaView style={styles.main}>
      <Text>SignUp</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
    paddingValue: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
})