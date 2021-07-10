import { useState, useEffect } from 'react'

import { expenseSubscriber } from '../api/expenses';
import { groupByCategory } from '../functions/expenses';

export default function useExpenses(groupBy) {
  const [expenses, setExpenses] = useState({});

  useEffect(() => {
    const unsubscribe = expenseSubscriber(setExpenses);
    return () => {
      unsubscribe();
    }
  }, []);

  if (!expenses) {
    return {};
  }
  
  switch (groupBy) {
    case 'category':
      return groupByCategory(Object.values(expenses));
    
    case 'array':
      return Object.values(expenses);

    default:
      return expenses
  }
}
