import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Avatar, Card, Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5'

import ExpenseForm from '../components/ExpenseForm';
import BudgetTracker from '../components/BudgetTracker';
import Screen from '../components/Screen';
import { getCurrentUserDisplayName } from '../../api/auth';



export default function HomeScreen({ navigation }) {
  const displayName = getCurrentUserDisplayName()

  return (
    <Screen style={styles.container} title="Home" enableAppbar={true}>
      <ScrollView>
      <Card style={[styles.card, {alignItems: 'center'}]}>
        <Icon style={styles.icon} name='user-alt' size={72} />
        <Text style={styles.avatarName}>{displayName}</Text>
      </Card>
      <Card style={styles.card}>
        <BudgetTracker />
      </Card>
      <Card style={styles.card}>
        <ExpenseForm />
      </Card>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: '1%',
    marginVertical: 2,
    paddingHorizontal: '2%',
    paddingVertical: 15,
  },
  icon: {
    marginLeft: 26,
    color: '#323031'
  },
  avatarName: {
    fontSize: 20,
    marginTop: 2,
    fontWeight: 'bold',
  },
  budget: {
    flex: 11,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
