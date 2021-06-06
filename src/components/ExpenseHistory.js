import React from 'react';
import { FlatList, Text, View, StyleSheet, Item } from 'react-native';
import { List } from 'react-native-paper';
import PriceTag from './PriceTag';

export default ({ history }) => {
  const renderItem = ({ item }) => (
    <List.Item
      style={styles.item}
      title={item.title}
      description={item.description}
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
    margin: 20
  },
  item: {
    margin: 5,
    borderColor: 'black'
  },
  title: {
    backgroundColor: 'green'
  }
})