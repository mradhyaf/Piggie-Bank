import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ScrollView} from 'react-native';
import { List, Button, Paragraph, Dialog, Portal, Divider} from 'react-native-paper';

import { readExpense } from '../../api/expenses';
import PriceTag from './PriceTag';
import accumulatePrice from '../functions/accumulatePrice';
import getCategory from '../functions/getCategory';

export default () => {
  const [expenses, setExpenses] = useState([]);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    readExpense(
      val => {if (val) setExpenses(Object.values(val))},
      console.error
    )
  }, [])
  
  const handleDelete = (expenseKey) => {
    deleteExpense(
      expenseKey,
      () => console.log("Deleted expense"),
      console.error
    )
  }
  
  const accordion = (category, data) => (
    <List.Accordion
      left={() => <List.Icon icon='folder' />}
      title={category}
      id={category}
      right={() => <PriceTag value={accumulatePrice(data)}/>}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
      />
    </List.Accordion>
  )

  const renderItem = ({ item }) => (
    <View>
      <List.Item
        style={styles.item}
        title={item.title}
        description={item.description}
        right={() =>
        <View style={{flexDirection: 'row'}}>
          <PriceTag value={item.price} />
          <Button icon={'trash-can-outline'} onPress={() => handleDelete(item.key)} />
        </View>}
      />
      <Divider />
    </View>
  );
  
  return (
    <ScrollView>
      <List.AccordionGroup>
        {/* {categories.map((category) => {
          return accordion(category, getCategory(expenses, category))
        })} */}
        {accordion("Food", expenses)}
      </List.AccordionGroup>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 20
  }
})