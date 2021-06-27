import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Dialog, Portal, Divider, List, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'

import accumulatePrice from '../functions/accumulatePrice';
import getCategory from '../functions/getCategory';
import { useSelector } from 'react-redux';
import { selectExpenses } from '../store/expensesSlice';
import CATEGORIES from '../constants/CATEGORIES';

export default () => {
  const expenses = useSelector(selectExpenses)
  const [visible, setVisible] = React.useState(false);
  const [item, setItem] = React.useState('');

  console.log(CATEGORIES[0].title);
  console.log(accumulatePrice(getCategory("Food", expenses)))
  
  const subtotal = (category) => {
    return accumulatePrice(getCategory(category, expenses))
  }

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title 
        title={item.title}
        left={({ size }) => <Icon name={item.icon} size={size} />}
        right={({ size }) => (
          <Text style={[{ fontSize: size }, styles.total]}>
            {subtotal(item.title)}
          </Text>)}
      />
    </Card>
  )
  
  return (
    <FlatList
      style={styles.list}
      data={CATEGORIES}
      renderItem={renderItem}
    />
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