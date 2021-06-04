import React from 'react';
import { TextInput } from "react-native-paper";

export default (props) => {
  return (
    <TextInput
      label="Item"
      value={props.ItemName}
      onChangeText={item => props.setItemName(item)}
    />
  );
}
