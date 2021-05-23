import React from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar, Platform, View } from 'react-native';
import TopBar from './Appbar.js';
import Content from './Content.js'
import BotNav from './BottomNavigation.js';

export default function App() {
  const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  return (
    <SafeAreaView style={[styles.main, { paddingTop: paddingValue }]}>
      <View>
        <TopBar />
      </View>
      <View>
        <Content />
      </View>
      <View>
        <BotNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
  }
})