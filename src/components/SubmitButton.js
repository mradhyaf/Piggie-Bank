import React from 'react';
import { Button } from 'react-native-paper';
import { createExpense } from '../../api/expenses';

export default (props) => (
  <Button mode="contained" onPress={props.onSubmit}>
    SUBMIT
  </Button>
);