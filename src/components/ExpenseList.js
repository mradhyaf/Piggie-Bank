import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Card, Dialog, Portal, Divider, List, Text, Button, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'

import { getCurrentUserId } from '../../api/auth';
import { deleteExpense } from '../../api/expenses';
import { DDMMYYYY } from '../../functions/date';
import { groupByCategory, priceTotal } from '../../functions/expenses';
import useExpenses from '../../hooks/useExpenses';

export default function ExpenseList({ category }) {
  // User expenses  
  const expenses = useExpenses();
  console.log(expenses)
  const categoricalExpenses = groupByCategory(expenses)[category];

  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState('');

  // Expense deletion
  const handleDelete = (expenseKey) => {
    deleteExpense(getCurrentUserId(), expenseKey)
  }

  const DeleteBox = ({ expense }) => (
    <Icon name="trash" style={styles.deleteBox} onPress={() => {setVisible(true); setItem(expense); }} />
  )

  // List render item
  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => <DeleteBox expense={item} />}>
      <List.Item
        style={styles.listItem}
        title={item.title}
        description={DDMMYYYY(item.date)}
        right={() => <Text style={styles.center}>{'$' + item.price}</Text>}
      />
    </Swipeable>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title 
          style={styles.cardTitle} 
          right={({ size }) => <Text style={{fontSize: size}}>{'$' + priceTotal(categoricalExpenses)} </Text>}
          title={category}
          
        />
      </Card>
      <FlatList
        style={styles.list}
        data={categoricalExpenses}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />

      {/* Confirmation dialogs */}
      <Portal>
        <Dialog visible={visible} onDismiss={() => { setVisible(false); setItem(''); }}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>'Are you sure you want to delete?'</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => { setVisible(false); handleDelete(item.key) }}>Yes</Button>
            <Button onPress={() => { setVisible(false); setItem(''); }}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  list: {
    // borderColor: 'black',
    // borderWidth: StyleSheet.hairlineWidth,
  },
  listItem: {
    // fontWeight: 'bold'
    backgroundColor: '#FFF'
  },
  card: {
    marginTop: '1%',
    marginHorizontal: '1%',
  },
  cardTitle: {
    fontWeight: 'bold'
  },
  center: {
    paddingTop: 15,
    fontWeight: 'bold'
  },
  deleteBox: {
    padding: 27,
    backgroundColor: 'red',
    color: 'white'
  },
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  }
})