import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";

import {
  groupByCategory,
  inTheMonthOf,
  priceTotal,
} from "../../../../functions/expenses";
import { deleteExpense, selectExpenses } from "../../../../store/expensesSlice";
import ExpenseList from "../../../components/ExpenseList";
import Screen from "../../../components/Screen";
import CATEGORIES from "../../../constants/CATEGORIES";

export default function CategoryScreen({ route, navigation, category }) {
  const dispatch = useDispatch();

  const { month, year } = route.params;

  // User expenses
  const expenses = inTheMonthOf(
    month,
    year,
    groupByCategory(useSelector(selectExpenses))[category]
  );

  return (
    <Screen
      style={styles.container}
      backAction={navigation.goBack}
      appbarContentProps={{
        title: category,
        subtitle: "SGD " + priceTotal(expenses),
      }}
      icon={() => (
        <Icon
          name={iconMap[category].icon}
          color={iconMap[category].color}
          size={30}
        />
      )}
    >
      {/* <Card style={styles.card}>
        <Card.Title
          style={styles.cardTitle}
          right={({ size }) => (
            <Text style={{ fontSize: size }}>
              {"$" + priceTotal(expenses)}{" "}
            </Text>
          )}
          title={category}
        />
      </Card> */}
      <ExpenseList
        data={expenses}
        handleDelete={(item) => dispatch(deleteExpense(item.key))}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 113,
  },
  card: {
    marginTop: "1%",
    marginHorizontal: "1%",
  },
  cardTitle: {
    fontWeight: "bold",
  },
});

const iconMap = {
  Food: {
    icon: "apple-alt",
    color: "#89023E",
  },
  Transportation: {
    icon: "bus",
    color: "#34bdc2",
  },
  Utilities: {
    icon: "toolbox",
    color: "#faf737",
  },
  Personal: {
    icon: "book",
    color: "#b6e090",
  },
  Others: {
    icon: "shopping-bag",
    color: "#ffd9da",
  },
};
