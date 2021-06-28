import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Avatar, Card, Text } from "react-native-paper";
import { useSelector } from 'react-redux';

import ExpenseForm from '../components/ExpenseForm';
import BudgetTracker from '../components/BudgetTracker';
import Screen from '../components/Screen';
import { selectDisplayName, selectPhotoURL } from '../store/authSlice';



export default function HomeScreen({ navigation }) {
  const photoURL = useSelector(selectPhotoURL);
  const displayName = useSelector(selectDisplayName);

  return (
    <Screen style={styles.container} title="Home" enableAppbar={true}>
      <ScrollView>
      <Card style={styles.card}>
        <Avatar.Image style={styles.avatar} size={72} label='OK' source={photoURL} />
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
  avatar: {
    flex: 1,
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
  }
})
