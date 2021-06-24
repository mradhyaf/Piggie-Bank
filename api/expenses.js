import { getCurrentUserId } from "./auth";
import firebase from "./firebase";

const db = firebase.database();
const expensesRef = db.ref(`expenses`);

export const createExpense = async ({ title, price, date, category }, onSuccess, onError) => {
  try {
    const uid = getCurrentUserId();
    const expense = expensesRef.child(uid).push();
    const newExpense = {
      key: expense.key,
      title: title,
      price: price,
      date: date,
      category: category
    }
    await expense.set(newExpense);
    return onSuccess(newExpense);
  } catch (error) {
    return onError(error);
  }
}

export const readExpense = async (onSuccess, onError) => {
  try {
    const uid = getCurrentUserId();
    const snapshot = await expensesRef.child(uid).get();
    return onSuccess(snapshot.val());
  } catch (error) {
    return onError(error);
  }
}

export const updateExpense = async (updates, onSuccess, onError) => {
  try {
    const uid = getCurrentUserId();
    await expensesRef.child(uid).update(updates);
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const deleteExpense = async (expenseKey, onSuccess, onError) => {
  try {
    const uid = getCurrentUserId();
    await expensesRef.child(uid).child(expenseKey).remove();
    return onSuccess(expenseKey);
  } catch (error) {
    return onError(error);
  }
}