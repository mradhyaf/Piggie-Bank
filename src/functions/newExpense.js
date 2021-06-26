import { v4 as generateKey } from "uuid"
// creates a new expense object
export default function newExpense(title, price, date, category) {
  return {
    key: generateKey,
    title,
    price,
    date,
    category,
  }
}

// example of expense object:
// {
//   category: '',
//   date: '',
//   key: '',
//   price: 0,
//   title: '',
// }