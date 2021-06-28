import React from 'react'
import { TextInput } from 'react-native-paper'

export default function NumericInput({ onChangeText, ...props }) {
  const onChange = (text) => {
    onChangeText(text.replace(/[^0-9]/g, ''));
  }

  return (
    <TextInput
      {...props}
      onChangeText={onChange}
      keyboardType={'numeric'}
    />
  )
}