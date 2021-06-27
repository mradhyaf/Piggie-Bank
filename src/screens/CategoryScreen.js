import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Dialog, Portal, Divider, List, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function CategoryScreen({ navigation, category }) {
  return (
    <View>
      <Card style={styles.card}>
        <Card.Title 
          title={category}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
  },
  card: {
    marginTop: '1%',
    marginHorizontal: '1%',
  },
  total: {
    padding: 15,
  }
})