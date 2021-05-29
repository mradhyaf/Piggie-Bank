import React from 'react';
import { FlatList, Text, View } from 'react-native';
import ExpenseHistoryItem from "./ExpenseHistoryItem";

export default (props) => {
  return (
    <View>
      <FlatList
        data={props.history}
        renderItem={ExpenseHistoryItem}
        keyExtractor={(item => item.id)}
      />
    </View>
  )
}