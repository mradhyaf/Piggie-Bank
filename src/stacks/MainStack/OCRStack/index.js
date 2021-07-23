import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";

import OCR from "./OCR";
import Confirmation from "./Confirmation";

const Stack = createStackNavigator();

export default () => {
  const [expenses, setExpenses] = useState([]);

  const deleteExpense = (item) => {
    setExpenses(expenses.slice().filter((el) => el.title !== item.title));
  };

  return (
    <Stack.Navigator initialRouteName="Main" headerMode="none">
      <Stack.Screen name={"Main"}>
        {(props) => <OCR {...props} setExpenses={setExpenses} />}
      </Stack.Screen>
      <Stack.Screen name={"Confirmation"}>
        {(props) => (
          <Confirmation
            {...props}
            expenses={expenses}
            deleteExpense={deleteExpense}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
