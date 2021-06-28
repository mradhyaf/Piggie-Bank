import React from 'react'
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

import { selectExpenses } from '../store/expensesSlice';
import { groupByCategory, priceTotal } from '../functions/expenses';
import { useSelector } from 'react-redux';

export default function () {
  const screenWidth = Dimensions.get('window').width;
  const expenses = useSelector(selectExpenses);
  const expensesByCategory = groupByCategory(expenses);

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
        data: [priceTotal(expensesByCategory['Food']),
        priceTotal(expensesByCategory['Transportation']),
        priceTotal(expensesByCategory['Utilities']),
        priceTotal(expensesByCategory['Personal']),
        priceTotal(expensesByCategory['Others'])],
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
        showValuesOnTopOfBars={true}/>
    </SafeAreaView>
  )
}