import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { Appbar } from 'react-native-paper'

export function Screen({ children }) {
  return (
    <SafeAreaView>
      <Appbar>
      <Appbar.Content
        title="Expenses"
      />
      </Appbar>
      <ScrollView>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

export default function ScreenWrapper(Component) {
  return function WrappedComponent(props) {
    return (
      <Screen>
        <Component {...props} />
      </Screen> 
    )
  }
}