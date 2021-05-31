import React from 'react';
import { FlatList, Text, View, StyleSheet, Item } from 'react-native';
import { List } from 'react-native-paper';
import PriceTag from './PriceTag';

export default ({ history }) => {
  const renderItem = ({ item }) => (
    // <View style={styles.item}>
    //   <Text style={styles.title}>{item.title}</Text>
    // </View>
    <List.Item
    style={styles.item}
    title={item.title}
    description={item.description}
    // right={props => <List.Icon {...props} icon="folder" />}
    right={() => <PriceTag value={item.price} />}
  />
  );
  
  return (
    <View>
      <FlatList
        style={styles.list}
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.title}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'red',
    padding: 50
  },
  item: {
    backgroundColor: 'blue',
    padding: 20
  },
  title: {
    backgroundColor: 'yellow'
  }
})