import React from 'react'
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

import { priceTotal } from '../../functions/expenses';
import useExpenses from '../../hooks/useExpenses';

export default function () {
  const screenWidth = Dimensions.get('window').width;
  const expenses = useSelector(selectExpenses);
  const expensesByCategory = (cat) => Math.ceil(priceTotal(groupByCategory(expenses)[(cat)]));

  const chartConfig={
     backgroundColor: "#ffffff",
     backgroundGradientFrom: "#ffffff",
     backgroundGradientTo: "#ffffff",
     fillShadowGradient: 'black',
     fillShadowGradientOpacity: 0.5,
     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  };

  const data = {
    labels: ['Food', 'Transportation', '   Utilities', 'Personal', 'Others'],
    datasets: [
      {
        data: [expensesByCategory('Food'),
        expensesByCategory('Transportation'),
        expensesByCategory('Utilities'),
        expensesByCategory('Personal'),
        expensesByCategory('Others')],
      }
    ]
  };

  return (
    <SafeAreaView>
      <BarChart
        data={data}
        width={screenWidth*0.98}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        showValuesOnTopOfBars={true}
      />
    </SafeAreaView>
  )
}