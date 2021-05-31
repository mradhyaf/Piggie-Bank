import React from 'react'
import { View, Text } from 'react-native'

export default ({ value }) => {
  return (
    <View>
      <Text>SGD </Text>
      <Text>{value}</Text>
    </View>
  )
}