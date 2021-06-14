import React from 'react';
import { FlatList, Text, View, StyleSheet, Item, ScrollView} from 'react-native';
import { List, Button } from 'react-native-paper';
import PriceTag from './PriceTag';

export default ({ data, handleDelete }) => {
  const renderItem = ({ item }) => (
    <List.Item
      style={styles.item}
      title={item.title}
      description={item.description}
      right={() =>
      <View style={{flexDirection: 'row'}}>
        <PriceTag value={item.price} />
            <Button icon={'trash-can-outline'} onPress={() => console.log('pressed')} />
      </View>}
    />
  );
  
  return (
    <View>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 20
  }
})