import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button } from 'react-native-paper';
import { createExpense } from '../../api/expenses';
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddExpenseForm() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const dateMY = (date) => date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  const [dateString, setDateString] = useState('Date: ' + dateMY(new Date()));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event, selectedDate) => {
    hideDatePicker();
    const currDate = selectedDate || date;
    const newDate = 'Date: ' + dateMY(currDate);
    setDate(currDate);
    console.log(currDate);
    setDateString(newDate);
  };
  
  const onPriceChanged = (text) => {
    setPrice(text.replace(/[^0-9.]/g, ''));
  }

  const handleSubmit = () => {
    const newExpense = {
      title: item,
      price: price,
      date: date,
      category: selectedCategory
    }
    createExpense(
      newExpense,
      console.log,
      console.error
    );
  }

  return (
    <View>
      <View style={styles.inputs}>
        <Button style={styles.button}
          mode={'outlined'}
          onPress={() => showDatePicker()}
          >{dateString}</Button>
        {isDatePickerVisible && (<DateTimePicker
          mode="date"
          value={date}
          onChange={handleConfirm}
        />)}
        <Text>Category</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>
        <TextInput
          placeholder={'Item'}
          value={item}
          onChangeText={(item) => setItem(item)}
          />
        <NumericInput
          placeholder={'Price'}
          value={price}
          onChangeText={(price) => setPrice(price)}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode={'outlined'}
          onPress={() => item === '' ? alert('Please enter a name for the item') : handleSubmit() }
          >SUBMIT</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs : {
    margin: 10,
  },
  input: {
    margin: 5
  },
  buttons: {
    flexDirection: 'row' ,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: 5,
  },
  picker: {
    backgroundColor: '#e3e1e1'
  }
})