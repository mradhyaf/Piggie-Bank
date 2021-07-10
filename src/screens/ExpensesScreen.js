import React, { useState } from 'react';
import { FlatList, StyleSheet, Pressable } from 'react-native';
import { Card, Divider, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import DateTimePicker from '@react-native-community/datetimepicker';

import Screen from '../components/Screen';
import { selectExpenses } from '../store/expensesSlice';
import { groupByCategory, priceTotal } from '../functions/expenses';
import CATEGORIES from '../constants/CATEGORIES';
import PieChart from '../components/PieChart'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'

export default function ExpensesScreen({ navigation }) {
  const expenses = useSelector(selectExpenses);
  const expensesByCategory = groupByCategory(expenses);
  const categories = CATEGORIES;
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [year, setYear] = React.useState(date.getFullYear());
  const [month, setMonth] = React.useState(date.getMonth());
  const [dateString, setDateString] = useState(`${month + 1}/${year}`);

  const handleConfirm = (event, selectedDate) => {
      setShow(false);
      const newDate = selectedDate || date;
      const newDateString = `${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
      setDate(newDate);
      setDateString(newDateString);
    };


  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate(item.title)} >
      <Card.Title
        title={item.title}
        left={({ size }) => <Icon style={styles.icon} name={item.icon} size={size} />}
        right={({ size }) => (
          <Text style={[{ fontSize: size }, styles.total]}>
            {'$' + priceTotal(expensesByCategory[item.title])}
          </Text>)}
      />
    </Card>
  )

  return (
    <Screen title="Expenses" enableAppbar={true}>
      <Pressable onPress={() => setShow(true)}>
        <TextInput
          style={styles.input}
          value={dateString}
          editable={false}
          mode='outlined'
        />
      </Pressable>
      {show && (<DateTimePicker
        display='spinner'
        mode="date"
        value={date}
        onChange={handleConfirm}
      />)}
      <SwiperFlatList autoplay autoplayDelay={5} autoplayLoop index={2}>
        <PieChart />
        <BarChart />
        <LineChart year={2021}/>
      </SwiperFlatList>
      <FlatList
        style={styles.list}
        data={categories}
        renderItem={renderItem}
        extractData={categories}
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