import { useState, useEffect } from 'react'

import { getUserExpensesRef } from '../api/expenses';
import { groupByCategory } from '../functions/expenses';

export default function useExpenses(groupBy) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const subscriber = getUserExpensesRef();
    subscriber.on(
      'value',
      (snapshot) => setExpenses(snapshot.val())
    )
    return () => {
      subscriber.off('value')
    }
  }, []);

  switch (groupBy) {
    case 'category':
      return groupByCategory(Object.values(expenses));
    
    default:
      return Object.values(expenses);
  }
}
