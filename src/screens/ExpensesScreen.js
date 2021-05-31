import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import ExpenseHistory from '../components/ExpenseHistory';
import SubmitButton from '../components/SubmitButton';


export default function ExpensesScreen() {
  const [item, setItem] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [history, setHistory] = React.useState(DATA);
  const itemRef = useRef();
  const priceRef = useRef();

  const handleSubmit = () => {
    const newExpense = { title: item, price: price }
    const newHistory = history.slice();
    newHistory.push(newExpense);
    setHistory(newHistory);
    console.log("submit pressed");
  }

  return (
    <SafeAreaView style={styles.container} >
      <View>
        <TextInput 
          style={styles.input}
          placeholder={'Item'}
          ref={itemRef}
          onChangeText={setItem}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder={'Price'}
          ref={priceRef}
          onChangeText={setPrice}
        />        
      </View> 
      <SubmitButton onPress={handleSubmit} />
      <ExpenseHistory history={history} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input : {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'red',
    padding: 20
  },
})

const DATA = [
  {
    title: "1kg chicken",
    price: 12,
  },
  {
    title: "1.8l detergent",
    price: 15,
  },
  {
    title: "bucket ice cream",
    price: 14,
  }
]