import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ScrollView} from 'react-native';
import { List, Button, Paragraph, Dialog, Portal, Divider} from 'react-native-paper';
import { readExpense,deleteExpense } from '../../api/expenses';
import PriceTag from './PriceTag';

export default () => {
  const [expenses, setExpenses] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [item, setItem] = React.useState('');

  useEffect(() => {
    readExpense(
      val => {if (val) setExpenses(Object.values(val))},
      console.error
    )
  }, [])

  const categories = ['1', '2', '3', '4', '5', '6'];
  const totalPrice = (data) => data.reduce((accumulator, data) => accumulator + Number(data.price), 0);
  const getCategory = (data, category) => data.filter(el => el.category === category);

  const handleDelete = (expenseKey) => {
    deleteExpense(
      expenseKey,
      () => console.log("Deleted expense"),
      console.error
    )
  }

  const categoryList = (category, data) => (
    <List.Accordion
      left={() => <List.Icon icon='folder' />}
      title={category}
      id={category}
      right={() => <PriceTag value={totalPrice(data)}/>}>
      {data.map((expense) => {
        return renderItem(expense);
      })}
    </List.Accordion>
  )

  const renderItem = (item) => (
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
        {categories.map((category) => {
          return categoryList(category, getCategory(expenses, category))
        })}
      </List.AccordionGroup>
      <Portal>
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
      </Portal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 20
  }
})