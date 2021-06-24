import React from 'react'
import { SafeAreaView } from 'react-native'
import { Button } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Button
          mode={'outlined'}
          onPress={() => navigation.navigate('Expenses')}
          >GOTO EXPENSES</Button>
    </SafeAreaView>
  )
}
