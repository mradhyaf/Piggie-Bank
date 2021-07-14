import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import ExpenseList from '../../../components/ExpenseList';

export default function CategoryScreen({ route, navigation, category}) {
  const { month, year } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={() => navigation.goBack()}>GO BACK</Button>
      <ExpenseList category={category} month={month} year={year} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  }
})