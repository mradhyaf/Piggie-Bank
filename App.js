import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const myString = "Hello, World!"
  return (
    <View style={{ borderColor: "black", borderWidth: 1 }}>
      <View style={{ backgroundColor: "blue", height: 50, width: 50 }}>
        <Text>This is my first React Native App!</Text>
        <StatusBar style="auto" />
      </View>
      <View style={{ backgroundColor: "red", height: 50, width: 50 }}>
        <Text>{myString}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
