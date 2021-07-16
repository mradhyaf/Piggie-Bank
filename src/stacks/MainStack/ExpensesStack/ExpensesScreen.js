import React, { useState } from "react";
import { FlatList, StyleSheet, Pressable } from "react-native";
import { Card, Divider, Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";

import Screen from "../../../components/Screen";
import PieChart from "../../../components/PieChart";
import BarChart from "../../../components/BarChart";
import LineChart from "../../../components/LineChart";
import { selectExpenses } from "../../../../store/expensesSlice";
import { groupByCategory, priceTotal, inTheMonthOf } from "../../../../functions/expenses";
import CATEGORIES from "../../../constants/CATEGORIES";
import { format } from "../../../../functions/date";

export default function ExpensesScreen({ navigation }) {
  const expenses = groupByCategory(useSelector(selectExpenses));
  console.log(expenses);

  const categories = CATEGORIES;
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [year, setYear] = React.useState(date.getFullYear());
  const [month, setMonth] = React.useState(date.getMonth());
  const [dateString, setDateString] = useState(`${month + 1}/${year}`);

  const handleConfirm = (event, selectedDate) => {
    setShow(false);
    const newDate = selectedDate || date;
    const newDateString = format(newDate, "MM/YYYY");
    setDate(newDate);
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
    setDateString(newDateString);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate(item.title, {
      month: month, year: year })}>
      <Card.Title
        title={item.title}
        left={({ size }) => (
          <Icon style={styles.icon} name={item.icon} size={size} />
        )}
        right={({ size }) => (
          <Text style={[{ fontSize: size }, styles.total]}>
            ${priceTotal(inTheMonthOf(month, year, expenses[item.title]))}
          </Text>
        )}
      />
    </Card>
  );

  return (
    <Screen title="Expenses" enableAppbar={true}>
      <Pressable onPress={() => setShow(true)}>
        <TextInput
          style={styles.input}
          value={dateString}
          editable={false}
          mode="outlined"
        />
      </Pressable>
      {show && (
        <DateTimePicker
          display="spinner"
          mode="date"
          value={date}
          onChange={handleConfirm}
        />
      )}
      <SwiperFlatList autoplay autoplayDelay={5} autoplayLoop index={2}>
        <PieChart month={month} />
        <BarChart month={month} />
        <LineChart year={year} />
      </SwiperFlatList>
      <FlatList
        style={styles.list}
        data={categories}
        renderItem={renderItem}
        extraData={categories}
        keyExtractor={(item) => item.title}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    // borderColor: 'black',
    // borderWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    color: "#084C61",
  },
  card: {
    marginTop: "1%",
    marginHorizontal: "1%",
  },
  total: {
    padding: 15,
  },
});
