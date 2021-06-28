import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, SafeAreaView, StatusBar,Platform } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Card, Dialog, Portal, Divider, List, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux';

import { DDMMYYYY } from '../functions/date';
import { groupByCategory, priceTotal } from '../functions/expenses';
import { selectExpenses, deleteExpense } from '../store/expensesSlice';

export default function CategoryScreen({ navigation, category }) {
  const dispatch = useDispatch()
  const expenses = useSelector(selectExpenses);
  const categoricalExpenses = groupByCategory(expenses)[category];

  const DeleteBox = ({ itemKey }) => (
    <Icon name="trash" onPress={() => dispatch(deleteExpense(itemKey))} />
  )

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => <DeleteBox itemKey={item.key} />}>
      <List.Item 
        title={item.title}
        description={DDMMYYYY(item.date)}
        right={() => <Text>{item.price}</Text>}
      />
    </Swipeable>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={() => navigation.goBack()}>GO BACK</Button>
      <Card style={styles.card}>
        <Card.Title 
          title={category}
        />
        <Text>{priceTotal(categoricalExpenses)}</Text>
      </Card>
      <FlatList
        style={styles.list}
        data={categoricalExpenses}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  list: {
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
  },
  card: {
    marginTop: '1%',
    marginHorizontal: '1%',
    flexDirection:'row'
  },
  total: {
    padding: 15,
  },
  deleteBox: {
    width: 10
  },
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  }
})