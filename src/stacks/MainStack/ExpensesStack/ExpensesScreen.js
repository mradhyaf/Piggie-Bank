import React, { useState } from "react";
import { FlatList, StyleSheet, Pressable, View } from "react-native";
import {
  Button,
  Caption,
  Card,
  Divider,
  Headline,
  Text,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";

import Screen from "../../../components/Screen";
import PieChart from "../../../components/PieChart";
import BarChart from "../../../components/BarChart";
import LineChart from "../../../components/LineChart";
import { selectExpenses } from "../../../../store/expensesSlice";
import {
  groupByCategory,
  priceTotal,
  inTheMonthOf,
  inTheYearOf,
} from "../../../../functions/expenses";
import CATEGORIES from "../../../constants/CATEGORIES";
import { format } from "../../../../functions/date";

export default function ExpensesScreen({ navigation }) {
  const expenses = groupByCategory(useSelector(selectExpenses));

  const categories = CATEGORIES;
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [year, setYear] = React.useState(date.getFullYear());
  const [month, setMonth] = React.useState(date.getMonth());
  const [dateString, setDateString] = useState(format(date, "Month YYYY"));

  const handleConfirm = (event, selectedDate) => {
    setShow(false);
    const newDate = selectedDate || date;
    const newDateString = format(newDate, "Month YYYY");
    setDate(newDate);
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
    setDateString(newDateString);
  };

  const renderItem = ({ item }) => (
    <Card
      elevation={0}
      style={styles.card}
      onPress={() =>
        navigation.navigate(item.title, {
          month: month,
          year: year,
        })
      }
    >
      <Card.Title
        title={item.title}
        left={({ size }) => (
          <Icon name={item.icon} size={size} color={item.color} />
        )}
        right={({ size }) => (
          <View style={styles.priceTotalContainer}>
            <Caption style={{ fontSize: size / 2 }}>SGD</Caption>
            <Headline style={[styles.priceTotalHeadline, { fontSize: size }]}>
              {priceTotal(inTheMonthOf(month, year, expenses[item.title]))}
            </Headline>
          </View>
        )}
      />
    </Card>
  );

  return (
    <Screen>
      <Text style={{ textAlign: "right" }}>
        Yearly Total: SGD
        {priceTotal(inTheYearOf(year, useSelector(selectExpenses)))}
      </Text>
      <Button
        onPress={() => setShow(true)}
        style={styles.dateButton}
        labelStyle={styles.dateLabel}
        mode="text"
        icon="chevron-down"
      >
        {dateString}
      </Button>
      {show && (
        <DateTimePicker
          display="spinner"
          mode="date"
          value={date}
          onChange={handleConfirm}
        />
      )}
      <View style={styles.priceTotalContainer}>
        <Caption style={{ fontSize: 20 }}>SGD</Caption>
        <Headline
          style={[styles.priceTotalHeadline, { fontSize: 40, paddingTop: 7 }]}
        >
          {priceTotal(inTheMonthOf(month, year, useSelector(selectExpenses)))}
        </Headline>
      </View>
      <View style={styles.chartContainer}>
        <SwiperFlatList
          // autoplay
          // autoplayDelay={5}
          // autoplayLoop
          // index={2}
          showPagination={true}
          paginationStyleItem={{ height: 10, width: 10 }}
          paginationDefaultColor="lightgray"
          paginationActiveColor="darkgray"
        >
          <PieChart month={month} year={year} />
          <BarChart month={month} year={year} />
          <LineChart year={year} />
        </SwiperFlatList>
      </View>
      <Divider />
      <FlatList
        style={styles.list}
        data={categories}
        renderItem={renderItem}
        extraData={categories}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => <Divider />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  dateButton: {
    alignItems: "center",
  },
  dateLabel: {
    fontWeight: "bold",
  },
  priceTotalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 15,
  },
  priceTotalHeadline: {
    paddingHorizontal: 5,
    fontWeight: "bold",
  },
  chartContainer: {
    paddingBottom: 35,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  list: {
    // borderColor: 'black',
    // borderWidth: StyleSheet.hairlineWidth,
  },
  card: {
    marginTop: "1%",
    marginHorizontal: "1%",
  },
});
