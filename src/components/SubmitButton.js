import React from 'react';
import { Button } from 'react-native-paper';

export default (props) => (
  <Button mode="contained" onPress={props.onSubmit}>
    SUBMIT
  </Button>
);