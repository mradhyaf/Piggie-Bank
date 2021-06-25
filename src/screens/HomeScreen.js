import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar, Button } from "react-native-paper";
import { useSelector } from 'react-redux';
import BudgetProgress from '../components/BudgetProgress';
import Screen from '../components/Screen';
import { selectPhotoURL } from '../store/authSlice';



export default function HomeScreen({ navigation }) {
  return (
    <Screen title="Home">
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Avatar.Text size={80} label='OK' />
          <Text style={styles.avatarName}>OBI-WAN KENOBI</Text>
        </View>
        <BudgetProgress />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black'
  },
  avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
  avatarName: {
    color: '#000',
    fontSize: 20,
    marginTop: 2,
    fontWeight: 'bold',
  }
})
