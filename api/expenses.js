import firebase from "./firebase";

const db = firebase.database();

const newExpense = (id, title, price, date) = { id, title, price, date };

export const createExpense = async ({ title, price }, onSuccess, onError) => {
  try {
    const expense = db.ref(`expenses`).push();
    await expense.set(newExpense(expense.key, title, price, new Date()));
    return onSuccess(expense);
  } catch (error) {
    return onError(error);
  }
}

