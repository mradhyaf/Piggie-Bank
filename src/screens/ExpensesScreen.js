import React, {  useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, TextInput, Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";

import { update, remove, selectExpenses } from '../store/expensesSlice';
import { signOut, getUid } from '../../api/auth';
import ExpenseList from '../components/ExpenseList';
import { createExpense, deleteExpense, readExpense } from "../../api/expenses";

export default function ExpensesScreen({ navigation }) {
  const expenses = useSelector(selectExpenses)
  const dispatch = useDispatch();
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  // const [history, setHistory] = useState([]);

  useEffect(() => {
    readExpense(getUid(),
      (expenses) => expenses ? dispatch(update(Object.values(expenses))) : null,
      console.error
    );
  }, [])

  const handleSignOut = () => {
    console.log('SIGN OUT pressed');
    signOut(() => console.log('SIGNED OUT'), console.error);
  }

  const handleDelete = (expenseKey) => {
    deleteExpense(
      getUid(), 
      expenseKey,
      (key) => dispatch(remove(key)),
      console.error
    )
    // const newHistory = history.slice().filter(expense => expense.key != expenseKey)
    // setHistory(newHistory);
  }

  const handleSubmit = () => {
    const newExpense = {
      title: item,
      price: price,
      date: Date()
    }
    // const newHistory = history.slice();
    createExpense(
      getUid(),
      newExpense,
      (expense) => dispatch(update([expense])),
      console.error
    );
    // setHistory(newHistory);
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
      <ExpenseList data={expenses} handleDelete={handleDelete} />
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode={'outlined'}
          onPress={handleSubmit}
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
  }
})