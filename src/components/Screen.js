import React from 'react'
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

export default function Screen({ children, title }) {
  return (
    <SafeAreaView style={styles.container}>
      <Appbar>
      <Appbar.Content
        title={title}
      />
      </Appbar>
      <ScrollView style={styles.content}>
          {children}
      </ScrollView>
    </SafeAreaView>
  )
}

export function ScreenWrapper(Component) {
  return function WrappedComponent(props) {
    return (
      <Screen>
        <Component {...props} />
      </Screen> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  content: {
    flex: 1,
    margin: '5%',
  }
})