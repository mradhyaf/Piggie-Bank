import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar, Button, Card } from "react-native-paper";
import { useSelector } from 'react-redux';

import ExpenseForm from '../components/ExpenseForm';
import BudgetProgress from '../components/BudgetProgress';
import Screen from '../components/Screen';
import { selectPhotoURL } from '../store/userSlice';



export default function HomeScreen({ navigation }) {
  return (
    <Screen style={styles.container} title="Home" enableAppbar={true}>
      <Card style={styles.card}>
        <Avatar.Text style={styles.avatar} size={72} label='OK' />
        <Text style={styles.avatarName}>OBI-WAN KENOBI</Text>
      </Card>
      <Card style={styles.card}>
        <BudgetProgress />
      </Card>
      <Card style={styles.card}>
        <ExpenseForm />
      </Card>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
  card: {
    marginHorizontal: '1%',
    marginVertical: 2,
    paddingHorizontal: '2%',
    paddingVertical: 15,
  },
  avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    flexDirection: 'row',
  },
  avatarName: {
    color: '#000',
    fontSize: 20,
    marginTop: 2,
    fontWeight: 'bold',
  },
  budget: {
    flex: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  }
})
