import React from 'react';
import { FlatList, Text, View, StyleSheet, Item, ScrollView} from 'react-native';
import { List, Button, Paragraph, Dialog, Portal, Divider} from 'react-native-paper';
import PriceTag from './PriceTag';

export default ({ data, handleDelete }) => {
  const [visible, setVisible] = React.useState(false);
  const [item, setItem] = React.useState('');

  const reducer = (accumulator, data) => accumulator + Number(data.price);
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
          right={() => <PriceTag value={data.reduce(reducer, 0)}/>}>
          <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion
          left={() => <List.Icon icon='folder' />}
          title='2'
          id='2'
          right={() => <PriceTag value={2}/>}>
          <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion
          left={() => <List.Icon icon='folder' />}
          title='3'
          id='3'
          right={() => <PriceTag value={3}/>}>
          <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion
          left={() => <List.Icon icon='folder' />}
          title='4'
          id='4'
          right={() => <PriceTag value={4}/>}>
          <FlatList
            style={styles.list}
            data={data}
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