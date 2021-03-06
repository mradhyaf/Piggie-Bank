import "react-native-get-random-values";
import { groupBy } from "lodash";

export function newExpense(title, price, date, category) {
  return {
    title,
    price,
    date,
    category,
  };
}

// Accumulates the price property of an array of expenses
export function priceTotal(data) {
  const reducer = (accumulator, currentExpense) =>
    accumulator + currentExpense.price;
  return data ? Number(data.reduce(reducer, 0).toFixed(2)) : 0;
}

export function groupByCategory(data) {
  return groupBy(data, "category");
}

export function inTheMonthOf(month, year, data) {
  function equalMonth(el) {
    const date = new Date(el.date);
    return date.getMonth() === month && date.getFullYear() === year;
  }
  return data ? data.filter(equalMonth) : null;
}

export function inTheYearOf(year, data) {
  return data
    ? data.filter((el) => new Date(el.date).getFullYear() === year)
    : null;
}
