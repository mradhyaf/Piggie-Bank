import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar, Button } from "react-native-paper";
import { useSelector } from 'react-redux';
import BudgetProgress from '../components/BudgetProgress';
import Screen from '../components/Screen';
import { selectPhotoURL } from '../store/userSlice';



export default function HomeScreen({ navigation }) {
  return (
    <Screen title="Home" enableAppbar={true}>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Text style={styles.avatarName}>OBI-WAN KENOBI</Text>
          <Avatar.Text size={32} label='OK' />
        </View>
        <View style={styles.budget}>
          <BudgetProgress />
        </View>
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
    borderColor: 'black',
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
