import React, { useState } from 'react'
import { View, Pressable } from 'react-native'
import { TextInput } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateInput({ handleChange, ...props }) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const dateMY = (date) => `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
  const [dateString, setDateString] = useState(dateMY(date));

  const handleConfirm = (event, selectedDate) => {
    setShow(false);
    const newDate = selectedDate || date;
    const newDateString = dateMY(newDate);
    setDate(newDate);
    setDateString(newDateString);
    if (handleChange) handleChange(newDate);
  };

  return (
    <View>
      <Pressable onPress={() => setShow(true)}>
        <TextInput 
          value={dateString}
          editable={false}
        />
      </Pressable>
        {show && (<DateTimePicker
          {...props}
          display='spinner'
          mode="date"
          value={date}
          onChange={handleConfirm}
        />)}
    </View>
  )
}
