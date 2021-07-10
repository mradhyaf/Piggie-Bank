import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import NumericInput from './NumericInput';
import CATEGORIES from '../constants/CATEGORIES';
import dateMY from '../../functions/dateMY';
import { addExpense } from '../../api/expenses';

export default function ExpenseForm() {
  // Form variables
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].title);
  const [date, setDate] = useState(new Date())
  const [dateString, setDateString] = useState(dateMY(date));
  
  // DateTimePicker visibility
  const [show, setShow] = useState(false);

  const handleConfirm = (event, selectedDate) => {
    setShow(false);
    const newDate = selectedDate || date;
    const newDateString = dateMY(newDate);
    setDate(newDate);
    setDateString(newDateString);
  };

  const handleSubmit = () => {
    addExpense(
      {
        title: item,
        price,
        date: date.toString(),
        category
      }
    )
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={'Item'}
        value={item}
        mode='outlined'
        onChangeText={(item) => setItem(item)}
        />
      <NumericInput
        style={styles.input}
        placeholder={'Price'}
        value={price}
        mode='outlined'
        onChangeText={(price) => setPrice(price)}
      />
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
      <Picker
        style={styles.picker}
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) =>
          setCategory(itemValue)}
      >{CATEGORIES.map(({ title }) => (
          <Picker.Item label={title} value={title} key={title}/>
        ))}
      </Picker>
      <Button
        style={styles.button}
        mode={'contained'}
        onPress={() => item === '' ? alert('Please enter a name for the item') : handleSubmit() }
      >SUBMIT</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: 5
  },
  button: {
    margin: 5,
  },
  picker: {
    backgroundColor: '#e3e1e1',
    height: 56,
    margin: 5
  }
})