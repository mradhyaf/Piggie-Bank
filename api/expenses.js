import firebase from "./firebase";

const db = firebase.database();

const newExpense = (id, title, price, date) => { id, title, price, date };

export const createExpense = async ({ title, price }, onSuccess, onError) => {
  try {
    const expense = db.ref(`expenses`).push();
    await expense.set(newExpense(expense.key, title, price, new Date()));
    return onSuccess(expense);
  } catch (error) {
    return onError(error);
  }
}

export const deleteExpense = async ({ expenseId }, onSuccess, onError) => {
  try {
    await db.ref(`expenses/${expenseId}`).remove();
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const getExpenses = async (onError) => {
  try {
    const expenses = (await db.ref(`expenses`).get()).val();
    return expenses;
  } catch (error) {
    return onError(error);
  }
}