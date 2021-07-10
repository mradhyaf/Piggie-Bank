import React from 'react'
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

import { priceTotal } from '../../functions/expenses';
import useExpenses from '../../hooks/useExpenses';

export default function () {
  const screenWidth = Dimensions.get('window').width;
  const expenses = useExpenses('category');

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
        data: [priceTotal(expenses['Food']),
        priceTotal(expenses['Transportation']),
        priceTotal(expenses['Utilities']),
        priceTotal(expenses['Personal']),
        priceTotal(expenses['Others'])],
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