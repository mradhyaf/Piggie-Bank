import * as React from 'react';
import { TextInput } from 'react-native-paper';

export default (props) => {
  return (
    <TextInput
      label="Price"
      value={props.price}
      onChangeText={price => props.setPrice(price)}
    />
  );
};