import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { priceTotal } from '../functions/expenses';
import { selectExpenses } from '../store/expensesSlice';

import { selectBudget, setBudget } from '../store/settingsSlice';
import NumericInput from './NumericInput';

export default function BudgetTracker() {
  const dispatch = useDispatch();
  const budget = useSelector(selectBudget);
  const expenses = useSelector(selectExpenses);
  const percentage = (priceTotal(expenses) / budget);

  const [show, setShow] = useState(false);
  const [newBudget, setNewBudget] = useState('');

  const chartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  };

  const data = {
    data: [percentage > 1 ? 1 : percentage],
  };

  return (
    <View>
      <Pressable style={styles.container} onPress={() => setShow(!show)}>
        <View>
          <Text>               Your Budget: {`${budget}`}</Text>
          {percentage >= 1 && (<View>
            <Text style={{color:'red', paddingLeft:80}}>Exceeded</Text>
          </View>)}
          <ProgressChart
            data={data}
            width={250}
            height={160}
            strokeWidth={16}
            radius={64}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </View>
      </Pressable>
      {show && (<View>
        <NumericInput
          placeholder={'Budget'}
          value={newBudget}
          onChangeText={(newBudget) => setNewBudget(newBudget)}
        />
        <Button
          onPress={() => {dispatch(setBudget(newBudget)); setShow(false); }}
        >Set Budget</Button>
      </View>)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    margin: '5%'
  },
  text: {
    color: '#000',
    fontSize: 20,
    marginTop: 2,
    fontWeight: 'bold',
  }
})