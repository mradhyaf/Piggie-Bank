import { useSelector } from "react-redux";
import { filter, groupBy } from 'lodash';
import { v4 as generateKey } from "uuid"

import { selectExpenses } from "../store/expensesSlice";

const expenses = useSelector(selectExpenses);

export function newExpense(title, price, date, category) {
  return {
    key: generateKey(),
    title,
    price,
    date,
    category,
  }
}

export function byCategory() {
  return groupBy(expenses, 'category');
}

export function inTheMonthOf(month, year) {
  function equalMonth(el) {
    const date = el.date;
    return date.getMonth() === month && date.getFullYear() === year;
  }
  return data.filter(equalMonth);
}

export function categorySubtotal(category) {
  const reducer = (accumulator, currentExpense) => accumulator + Number(currentExpense.price);
  return data.reduce(reducer, 0)
}