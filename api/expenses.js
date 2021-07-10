import { db } from "./firebase";
import { getCurrentUserId } from "./auth";
import optionalFunction from '../functions/optionalFunction'

export function getUserExpensesRef() {
  return db.ref('expenses/' + getCurrentUserId());
}

// Adds a listener to the user's expenses and returns a function to unsubscribe
export function expenseSubscriber(callback, type = 'value') {
  const subscriber = getUserExpensesRef()
  subscriber.on(
    type,
    (snapshot) => optionalFunction(callback)(snapshot.val())
  )
  return subscriber.off
}

export const addExpense = async ({ title, price, date, category }, onSuccess, onError) => {
  try {
    const expense = getUserExpensesRef().push();
    const newExpense = {
      key: expense.key,
      title,
      price,
      date,
      category
    }
    await expense.set(newExpense);
    optionalFunction(onSuccess)();
  } catch (error) {
    console.error(error);
    optionalFunction(onError)(error);
  }
}

export const deleteExpense = async (expenseKey, onSuccess, onError) => {
  try {
    await getUserExpensesRef().child(expenseKey).remove();
    optionalFunction(onSuccess)();
  } catch (error) {
    console.error(error);
    optionalFunction(onError)(error);
  }
}

export const getUserExpenses = async (onSuccess, onError) => {
  try {
    const snapshot = await getUserExpensesRef().get();
    optionalFunction(onSuccess)();
    return onSuccess(snapshot.val());
  } catch (error) {
    console.error(error);
    optionalFunction(onError)(error);
  }
}

export const updateUserExpenses = async (updates, onSuccess, onError) => {
  try {
    await getUserExpensesRef().update(updates);
    optionalFunction(onSuccess)();
  } catch (error) {
    console.error(error);
    optionalFunction(onError)(error);
  }
}
