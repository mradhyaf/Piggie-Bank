import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default function LoadingScreen() {
  return (
    <View>
      <ActivityIndicator animating={true} />
    </View>
  )
}
