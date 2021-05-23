import * as React from 'react';
import { TextInput } from 'react-native-paper';

const MyComponent = () => {
  const [date, setDate] = React.useState('');

  return (
    <TextInput
      label="Date"
      value={date}
      onChangeText={date => setDate(date)}
    />
  );
};

export default MyComponent;