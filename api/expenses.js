import firebase from "./firebase";

const db = firebase.database();
const expensesRef = db.ref(`expenses`);

export const createExpense = async (uid, { title, price, date }, onSuccess, onError) => {
  try {
    const expense = expensesRef.child(uid).push()
    const newExpense = {
      key: expense.key,
      title: title,
      price: price,
      date: date
    }
    await expense.set(newExpense);
    return onSuccess(newExpense);
  } catch (error) {
    return onError(error);
  }
}

export const readExpense = async (uid, onSuccess, onError) => {
  try {
    const snapshot = await expensesRef.child(uid).get();
    return onSuccess(snapshot.val());
  } catch (error) {
    return onError(error);
  }
}

export const updateExpense = async (uid, updates, onSuccess, onError) => {
  try {
    await expensesRef.child(uid).update(updates);
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const deleteExpense = async (uid, expenseKey, onSuccess, onError) => {
  try {
    await expensesRef.child(uid).child(expenseKey).remove();
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}