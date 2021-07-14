import React from 'react'
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { useSelector } from 'react-redux';

import { selectExpenses } from '../../store/expensesSlice';
import { groupByCategory, priceTotal, inTheMonthOf } from '../../functions/expenses';

export default function ({year}) {
  const screenWidth = Dimensions.get('window').width;
  const expenses = useSelector(selectExpenses);
  const expensesByCategory = (cat) => Math.ceil(priceTotal(groupByCategory(expenses)[(cat)]));

  const chartConfig={
    backgroundColor: '#b90602',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  }

  function dataGet() {
    const a = [];
    for(let i = 0; i < 12; i++) {
      a[i] = priceTotal(inTheMonthOf(i, year, expenses));
    }
    return a;
  }

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: dataGet(),
      }
    ]
  };

  return (
    <SafeAreaView>
      <LineChart
        data={data}
        width={screenWidth*0.98}
        height={200}
        yAxisLabel='$'
        chartConfig={chartConfig}
        style={chartConfig.style}
        />
    </SafeAreaView>
  )
}
