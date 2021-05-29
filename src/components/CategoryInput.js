import React from 'react';
import { TextInput } from "react-native-paper";

export default (props) => {
  return (
    <TextInput
      label="Category"
      value={props.category}
      onChangeText={category => props.setCategory(category)}
    />
  );
}
