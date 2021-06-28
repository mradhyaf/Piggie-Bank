import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Dialog, Portal, Divider, List, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux';

import Screen from '../components/Screen';
import { selectExpenses } from '../store/expensesSlice';
import { groupByCategory, priceTotal } from '../functions/expenses';

export default function ExpensesScreen({ navigation }) {
  const expenses = useSelector(selectExpenses);
  const expensesByCategory = groupByCategory(expenses);
  const categories = ["Food", "Transportation", "Utilities", "Personal", "Others"];

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate(item)} >
      <Card.Title
        title={item}
        // left={({ size }) => <Icon name={item} size={size} />}
        right={({ size }) => (
          <Text style={[{ fontSize: size }, styles.total]}>
            {priceTotal(expensesByCategory[item])}
          </Text>)}
      />
    </Card>
  )

  return (
    <Screen title="Expenses" enableAppbar={true}>
      {/* <PieChart /> */}
      <FlatList
        style={styles.list}
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </Screen>
  )
  {/* <Portal>
      <Dialog visible={visible} onDismiss={() => { setVisible(false); setItem(''); }}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>'Are you sure you want to delete?'</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => { setVisible(false); handleDelete(item.key); }}>Yes</Button>
          <Button onPress={() => { setVisible(false); setItem(''); }}>No</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal> */}
}

const styles = StyleSheet.create({
  list: {
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
  },
  card: {
    marginTop: '1%',
    marginHorizontal: '1%',
  },
  total: {
    padding: 15,
  }
})