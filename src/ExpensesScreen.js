import React from 'react';
import { View, Text } from 'react-native';
import CategoryInput from './components/CategoryInput';
import DateInput from './components/DateInput';
import ExpenseHistory from './components/ExpenseHistory'
import ItemNameInput from './components/ItemNameInput';
import PriceInput from "./components/PriceInput";
import SubmitButton from './components/SubmitButton';


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
    <View>
      <ItemNameInput itemName={itemName} setItemName={setItemName} />
      <PriceInput price={price} setPrice={setPrice} /> 
      {/* <CategoryInput category={category} setCategory={setCategory} /> */}
      {/* <DateInput date={date} setDate={setDate} /> */}
      <SubmitButton onSubmit={onSubmit} />
      <ExpenseHistory history={history} />
    </View>
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