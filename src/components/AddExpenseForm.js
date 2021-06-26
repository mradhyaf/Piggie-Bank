import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import newExpense from '../functions/newExpense';
import NumericInput from './NumericInput';
import categories from '../../assets/categories'
import { update } from '../store/expensesSlice';

export default function AddExpenseForm() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const dispatch = useDispatch()

  const handleSubmit = () => {
    const expense = newExpense(item, price, Date(), category);
    dispatch(update([expense]));
  }

  return (
    <View>
      <View>
        <Text>new picker later</Text>
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