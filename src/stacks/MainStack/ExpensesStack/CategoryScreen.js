import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import ExpenseList from '../../../components/ExpenseList';

export default function CategoryScreen({ navigation, category }) {
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={() => navigation.goBack()}>GO BACK</Button>
      <ExpenseList category={category} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  }
})