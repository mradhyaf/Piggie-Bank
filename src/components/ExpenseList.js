import React from 'react';
import { FlatList, Text, View, StyleSheet, Item, ScrollView} from 'react-native';
import { List, Button, Paragraph, Dialog, Portal, Divider} from 'react-native-paper';
import PriceTag from './PriceTag';

export default ({ data, handleDelete }) => {
  const [visible, setVisible] = React.useState(false);
  const [item, setItem] = React.useState('');

  const reducer = (accumulator, data) => accumulator + Number(data.price);
  const c1 = data.filter(expense => expense.category === "1");
  const c2 = data.filter(expense => expense.category === "2");
  const c3 = data.filter(expense => expense.category === "3");
  const c4 = data.filter(expense => expense.category === "4");
  const c5 = data.filter(expense => expense.category === "5");
  const c6 = data.filter(expense => expense.category === "6");
  const renderItem = ({ item }) => (
    <View>
      <List.Item
        style={styles.item}
        title={item.title}
        description={item.description}
        right={() =>
        <View style={{flexDirection: 'row'}}>
          <PriceTag value={item.price} />
          <Button icon={'trash-can-outline'} onPress={() => { setVisible(true); setItem(item); }} />
        </View>}
      />
      <Divider />
    </View>
  );
  
  return (
    <View>
      <List.AccordionGroup>
        <List.Accordion
          left={() => <List.Icon icon='folder' />}
          title='1'
          id='1'
          right={() => <PriceTag value={c1.reduce(reducer, 0)}/>}>
          <FlatList
            style={styles.list}
            data={c1}
            renderItem={renderItem}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion
          left={() => <List.Icon icon='folder' />}
          title='2'
          id='2'
          right={() => <PriceTag value={c2.reduce(reducer, 0)}/>}>
          <FlatList
            style={styles.list}
            data={c2}
            renderItem={renderItem}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion
          left={() => <List.Icon icon='folder' />}
          title='3'
          id='3'
          right={() => <PriceTag value={c3.reduce(reducer, 0)}/>}>
          <FlatList
            style={styles.list}
            data={c3}
            renderItem={renderItem}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion
          left={() => <List.Icon icon='folder' />}
          title='4'
          id='4'
          right={() => <PriceTag value={c4.reduce(reducer, 0)}/>}>
          <FlatList
            style={styles.list}
            data={c4}
            renderItem={renderItem}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion
          left={() => <List.Icon icon='folder' />}
          title='5'
          id='5'
          right={() => <PriceTag value={c5.reduce(reducer, 0)}/>}>
          <FlatList
            style={styles.list}
            data={c5}
            renderItem={renderItem}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion
          left={() => <List.Icon icon='folder' />}
          title='6'
          id='6'
          right={() => <PriceTag value={c6.reduce(reducer, 0)}/>}>
          <FlatList
            style={styles.list}
            data={c6}
            renderItem={renderItem}
          />
        </List.Accordion>
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
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 20
  }
})