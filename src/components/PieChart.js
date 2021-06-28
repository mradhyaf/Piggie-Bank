import React from 'react'
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

import { selectExpenses } from '../store/expensesSlice';
import { groupByCategory, priceTotal } from '../functions/expenses';
import { useSelector } from 'react-redux';

export default function () {
  const screenWidth = Dimensions.get('window').width;
  const expenses = useSelector(selectExpenses);
  const expensesByCategory = groupByCategory(expenses);

  const chartConfig={
    backgroundColor: '#26872a',
    backgroundGradientFrom: '#43a047',
    backgroundGradientTo: '#66bb6a',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  const pieChartData = [
    { name: 'Food', category: priceTotal(expensesByCategory['Food']), color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Transportation', category: priceTotal(expensesByCategory['Transportation']), color: '#F00',
    legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Utilities', category: priceTotal(expensesByCategory['Utilities']), color: 'turquoise',
    legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Personal', category: priceTotal(expensesByCategory['Personal']), color: '#ffffff',
    legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Others', category: priceTotal(expensesByCategory['Others']), color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F', legendFontSize: 10 }
  ];

  return (
    <SafeAreaView>
      <PieChart
        data={pieChartData}
        height={220}
        width={screenWidth*0.98}
        paddingLeft={25}
        chartConfig={chartConfig}
        accessor="category"
        style={chartConfig.style}
      />
    </SafeAreaView>
  )
}