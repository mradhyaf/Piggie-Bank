import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from "react-native-paper";

export default (props) => {
  return (
    <TextInput
      label="Date"
      value={props.date}
      onChangeText={date => props.setDate(date)}
    />
  );
}
