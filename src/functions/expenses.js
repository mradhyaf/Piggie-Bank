import 'react-native-get-random-values'
import { groupBy } from 'lodash';
import { v4 as generateKey } from "uuid"

export function newExpense(title, price, date, category) {
  return {
    key: generateKey(),
    title,
    price,
    date,
    category,
  }
}

// Accumulates the price property of an array of expenses
export function priceTotal(data) {
  const reducer = (accumulator, currentExpense) => accumulator + currentExpense.price;
  return data ? data.reduce(reducer, 0) : 0;
}

export function groupByCategory(data) {
  return groupBy(data, 'category');
}



export function inTheMonthOf(month, year, data) {
   function equalMonth(el) {
     const dat = new Date(el.date);
     return dat.getMonth() === month && dat.getFullYear() === year;
   }
   return data.filter(equalMonth);
}