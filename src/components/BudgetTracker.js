import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { priceTotal, inTheMonthOf } from "../../functions/expenses";
import { selectExpenses } from "../../store/expensesSlice";
import { selectBudget, setBudget } from "../../store/userSlice";
import NumericInput from "./NumericInput";

export default function BudgetTracker() {
  const dispatch = useDispatch();

  const budget = useSelector(selectBudget);

  const expenseRaw = useSelector(selectExpenses);
  const expenses = inTheMonthOf(
    new Date().getMonth(),
    new Date().getFullYear(),
    expenseRaw
  );
  const percentage = priceTotal(expenses) / budget;
  const exceed = Math.abs(budget - priceTotal(expenses));

  const [show, setShow] = useState(false);
  const [newBudget, setNewBudget] = useState(0);

  const handleSetBudget = () => {
    Number(newBudget)
      ? dispatch(setBudget(Number(newBudget)))
      : alert("Invalid input");
    setShow(false);
  };

  const chartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(218, 53, 47, ${opacity * 2})`,
  };

  const data = {
    data: [percentage > 1 ? 1 : percentage],
  };

  return (
    <View>
      {budget ? (
        <View>
          <Text style={styles.text}>Your Budget for this month: ${budget}</Text>
          {percentage >= 1 && (
            <View style={styles.text}>
              <Text style={{ color: "red" }}>Exceeded by ${exceed}</Text>
            </View>
          )}
          {percentage < 1 && (
            <View style={styles.text}>
              <Text style={{ color: "black" }}>
                ${exceed} left before exceeding
              </Text>
            </View>
          )}
          <View style={styles.progress}>
            <ProgressChart
              data={data}
              width={250}
              height={160}
              strokeWidth={16}
              radius={64}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          </View>
        </View>
      ) : (
        <Text style={styles.text}>You haven't set a budget</Text>
      )}

      {!show && (
        <Button onPress={() => setShow(true)} mode="text">
          Set Budget
        </Button>
      )}
      {show && (
        <View>
          <NumericInput
            placeholder={"Budget"}
            value={newBudget}
            maxLength={13}
            onChangeText={setNewBudget}
            mode="outlined"
            style={styles.input}
          />
          <Button onPress={handleSetBudget} mode="contained">
            Set Budget
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: 'white',
    // borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: "5%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    marginVertical: 5,
  },
  progress: {
    paddingLeft: 50,
  },
});
