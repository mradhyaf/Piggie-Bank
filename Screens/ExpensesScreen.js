import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View, Text } from 'react-native';
import CategoryInput from '../src/components/CategoryInput';
import DateInput from '../src/components/DateInput';
import ExpenseHistory from '../src/components/ExpenseHistory'
import ItemNameInput from '../src/components/ItemNameInput';
import PriceInput from "../src/components/PriceInput";
import SubmitButton from '../src/components/SubmitButton';


export default function ExpensesScreen() {
  const [itemName, setItemName] = React.useState('');
  const [price, setPrice] = React.useState('');
  // const [date, setDate] = React.useState('');
  const [history, setHistory] = React.useState(DATA);

  const onSubmit = () => {
    const newExpense = { title: itemName, price: price }
    const newHistory = history.slice();
    newHistory.push(newExpense);
    setHistory(newHistory);
    console.log("submit pressed");
  }

  return (
    <SafeAreaView style={[styles.main, { paddingTop: paddingValue }]}>
      <ItemNameInput itemName={itemName} setItemName={setItemName} />
      <PriceInput price={price} setPrice={setPrice} /> 
      {/* <CategoryInput category={category} setCategory={setCategory} /> */}
      {/* <DateInput date={date} setDate={setDate} /> */}
      <SubmitButton onSubmit={onSubmit} />
      <ExpenseHistory history={history} />
    </SafeAreaView>
  )
}

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

const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
  }
})