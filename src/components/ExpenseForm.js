import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';

import NumericInput from './NumericInput';
import CATEGORIES from '../constants/CATEGORIES';
import { format } from '../../functions/date';
import { addExpense } from '../../store/expensesSlice';

export default function ExpenseForm() {
  const dispatch = useDispatch();
  
  // Form variables
  const [item, setItem] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(CATEGORIES[0].title);
  const [date, setDate] = useState(new Date())
  const [dateString, setDateString] = useState(format(date));
  
  // DateTimePicker visibility
  const [show, setShow] = useState(false);

  const handleConfirm = (event, selectedDate) => {
    setShow(false);
    const newDate = selectedDate || date;
    const newDateString = format(newDate);
    setDate(newDate);
    setDateString(newDateString);
  };

  const handleSubmit = () => {
    const expense = newExpense(item, Number(price), date.toString(), category,);
    dispatch(addExpense(
      expense,
      (error) => error ? alert(error.message) : alert('Submitted')
    ));
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={'Item'}
        value={item}
        maxLength={50}
        mode='outlined'
        onChangeText={(item) => setItem(item)}
        />
      <NumericInput
        style={styles.input}
        placeholder={'Price'}
        value={price}
        maxLength={13}
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
        onPress={() => item === '' ? alert('Please enter a name for the item') : Number(price)
          ? handleSubmit()
          : alert('Invalid input')}
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

function newExpense(title, price, date, category) {
  return {
    title,
    price,
    date,
    category,
  }
}