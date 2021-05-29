import React from 'react';
import { Text } from 'react-native';
import { List } from 'react-native-paper';
import Price from './Price';

const MyComponent = ({ item }) => (
  <List.Item
    title={item.title}
    description={item.category}
    right={Price}
  />
);

export default MyComponent;