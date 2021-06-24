import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button } from 'react-native-paper';
import { createExpense } from '../../api/expenses';

export default function AddExpenseForm() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('1');

  const categories = [1, 2, 3, 4, 5, 6];
  
  const onPriceChanged = (text) => {
    setPrice(text.replace(/[^0-9.]/g, ''));
  }

  const handleSubmit = () => {
    const newExpense = {
      title: item,
      price: price,
      date: Date(),
      category: category
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
        <Text>Category</Text>
        <Picker
          style={styles.picker}
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) =>
            setCategory(itemValue)
          }>
          {categories.map((category) => (
            <Picker.Item label={category} value={category} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder={'Item'}
          value={item}
          onChangeText={(item) => setItem(item)}
          />
        <TextInput
          style={styles.input}
          placeholder={'Price'}
          value={price}
          onChangeText={onPriceChanged}
          keyboardType={'numeric'}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode={'outlined'}
          onPress={() => isNaN(Number(price)) || price === '' ? alert('Invalid. Enter a number for price instead')
          : item === '' ? alert('Please enter a name for the item') : handleSubmit() }
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