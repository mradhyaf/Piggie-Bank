import React from 'react'
import { View, Text } from 'react-native'
import DateInput from './DateInput.js'
import SubmitItem from './SubmitItem.js'

const Content = () => {
  return (
    <View>
      <View>
        <Text>This is the main content</Text>
      </View>
      <View>
        <DateInput />
      </View>
      <View>
        <SubmitItem />        
      </View>
    </View>
  )
}

export default Content
