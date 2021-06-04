import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { DATA } from "@env";
import { isSignedIn, signOut } from '../../api/auth';
import ExpenseHistory from '../components/ExpenseHistory';
import SubmitButton from '../components/SubmitButton';


export default function ExpensesScreen({ navigation }) {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState(0);
  const [history, setHistory] = useState();
  const itemRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    setHistory(DATA);
  }, []);

  const handleSignOut = () => {
    console.log('SIGN OUT pressed');
    signOut(() => console.log('SIGNED OUT'), console.error);
  }

  const handleSubmit = () => {
    const newExpense = { title: item, price: price }
    const newHistory = history.slice();
    newHistory.push(newExpense);
    setHistory(newHistory);
    console.log("submit pressed");
  }

  return (
    <View style={styles.main}>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder={'Item'}
          ref={itemRef}
          onChangeText={setItem}
          />
        <TextInput
          style={styles.input}
          placeholder={'Price'}
          ref={priceRef}
          onChangeText={setPrice}
        />        
      </View>
      <ExpenseHistory history={history} />
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
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
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