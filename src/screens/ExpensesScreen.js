import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import Screen from '../components/Screen';
import PieChart from '../components/PieChart'
import BarChart from '../components/BarChart'
import { priceTotal } from '../../functions/expenses';
import CATEGORIES from '../constants/CATEGORIES';
import useExpenses from '../../hooks/useExpenses';

export default function ExpensesScreen({ navigation }) {
  const expenses = useExpenses('category');
  const categories = CATEGORIES;

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate(item.title)} >
      <Card.Title
        title={item.title}
        left={({ size }) => <Icon style={styles.icon} name={item.icon} size={size} />}
        right={({ size }) => (
          <Text style={[{ fontSize: size }, styles.total]}>
            {'$' + priceTotal(expenses[item.title])}
          </Text>)}
      />
    </Card>
  )


  return (
    <Screen title="Expenses" enableAppbar={true}>
      <SwiperFlatList autoplay autoplayDelay={5} autoplayLoop index={1}>
        <PieChart />
        <BarChart />
      </SwiperFlatList>
      <FlatList
        style={styles.list}
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  list: {
    // borderColor: 'black',
    // borderWidth: StyleSheet.hairlineWidth,
  },
  icon:{
    color: '#084C61'
  },
  card: {
    marginTop: '1%',
    marginHorizontal: '1%',
  },
  total: {
    padding: 15,
  }
})