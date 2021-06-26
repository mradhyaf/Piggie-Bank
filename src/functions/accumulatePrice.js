// Accumulates the price property of an array of expenses
export default function priceTotal(data) {
  const reducer = (accumulator, currentExpense) => accumulator + Number(currentExpense.price);
  return data.reduce(reducer, 0)
}