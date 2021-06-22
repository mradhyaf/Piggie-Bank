import React, {  useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, TextInput, Appbar, Text } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

import { signOut, getUid } from '../../api/auth';
import ExpenseList from '../components/ExpenseList';
import { createExpense, deleteExpense, readExpense } from "../../api/expenses";


export default function ExpensesScreen({ navigation }) {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [history, setHistory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('1');

  useEffect(() => {
    readExpense(getUid(),
      (expenses) => expenses ? setHistory(Object.values(expenses)) : null,
      console.error
    );
  }, [])

  const handleSignOut = () => {
    console.log('SIGN OUT pressed');
    signOut(() => console.log('SIGNED OUT'), console.error);
  }

  const handleDelete = (expenseKey) => {
    deleteExpense(getUid(), expenseKey,
      () => console.log('Expense deleted'),
      console.error
    )
    const newHistory = history.slice().filter(expense => expense.key != expenseKey)
    setHistory(newHistory);
  }

  const handleSubmit = () => {
    const newExpense = {
      title: item,
      price: price,
      date: Date(),
      category: selectedCategory
    }
    const newHistory = history.slice();
    createExpense(
      getUid(),
      newExpense,
      (expense) => { newHistory.push(expense); setHistory(newHistory); },
      console.error
    );
  }

  return (
    <ScrollView>
      <Appbar>
      <Appbar.Action
        icon="dots-vertical"
        onPress={() => navigation.openDrawer()}
      />
      <Appbar.Content
        title="Expenses"
      />
      </Appbar>
      <View style={styles.inputs}>
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
          style={styles.input}
          placeholder={'Item'}
          value={item}
          onChangeText={(item) => setItem(item)}
          />
        <TextInput
          style={styles.input}
          placeholder={'Price'}
          value={price}
          onChangeText={(price) => setPrice(price)}
        />
      </View>
      <ExpenseList data={history} handleDelete={handleDelete} />
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode={'outlined'}
          onPress={() => isNaN(Number(price)) || price === '' ? alert('Invalid. Enter a number for price instead')
          : item === '' ? alert('Please enter a name for the item') : handleSubmit() }
          >SUBMIT</Button>
        <Button
          style={styles.button}
          mode={'outlined'}
          onPress={handleSignOut}
          >SIGN OUT</Button>
      </View>
    </ScrollView>
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