import 'react-native-get-random-values'
import { groupBy } from 'lodash';
import { v4 as generateKey } from "uuid"

// export function newExpense(title, price, date, category) {
//   return {
//     key: generateKey(),
//     title,
//     price,
//     date,
//     category,
//   }
// }

// Accumulates the price property of an array of expenses
export function priceTotal(data) {
  console.log('data received')
  console.log(data)
  const reducer = (accumulator, currentExpense) => accumulator + Number(currentExpense.price);
  return data ? data.reduce(reducer, 0) : 0;
}

export function groupByCategory(data) {
  return groupBy(data, 'category');
} 

// function inTheMonthOf(month, year) {
//   function equalMonth(el) {
//     const date = el.date;
//     return date.getMonth() === month && date.getFullYear() === year;
//   }
//   return data.filter(equalMonth);
// }