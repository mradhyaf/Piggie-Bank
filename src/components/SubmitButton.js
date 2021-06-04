import React from 'react';
import { Button } from 'react-native-paper';
import { createExpense } from '../../api/expenses';

export default ({ onPress }) => (
  <Button mode="contained" onPress={onPress}>
    SUBMIT
  </Button>
);