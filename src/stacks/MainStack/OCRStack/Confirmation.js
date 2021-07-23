import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import { addExpense } from "../../../../store/expensesSlice";
import ExpenseList from "../../../components/ExpenseList";
import Screen from "../../../components/Screen";
import CATEGORIES from "../../../constants/CATEGORIES";
import { format } from "../../../../functions/date";

export default function ({ navigation, expenses, deleteExpense }) {
  const dispatch = useDispatch();

  console.log(expenses);

  const [category, setCategory] = useState(CATEGORIES[0].title);
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(format(date));

  const [show, setShow] = useState(false);

  const handleConfirmDate = (event, selectedDate) => {
    setShow(false);
    const newDate = selectedDate || date;
    const newDateString = format(newDate);
    setDate(newDate);
    setDateString(newDateString);
  };

  const handleConfirm = () => {
    expenses.forEach((element) => {
      dispatch(
        addExpense({ ...element, category, date: date.toString() }),
        (error) => (error ? alert(error.message) : alert("Submitted"))
      );
    });
    navigation.goBack();
  };

  return (
    <Screen>
      <Text>These items will be added to your expenses</Text>
      <ExpenseList
        data={expenses}
        handleDelete={deleteExpense}
        listProps={{
          keyExtractor: (item, index) => index + item.title,
        }}
        listItemProps={{
          description: "",
        }}
      />
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
          onChange={handleConfirmDate}
        />
      )}
      <Picker
        style={styles.picker}
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        {CATEGORIES.map(({ title }) => (
          <Picker.Item label={title} value={title} key={title} />
        ))}
      </Picker>
      <View style={styles.buttons}>
        <Button onPress={handleConfirm}>CONFIRM</Button>
        <Button onPress={navigation.goBack}>CANCEL</Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 5,
  },
  picker: {
    backgroundColor: "#e3e1e1",
    height: 56,
    margin: 5,
  },
  buttons: {
    flexDirection: "row-reverse",
  },
});
