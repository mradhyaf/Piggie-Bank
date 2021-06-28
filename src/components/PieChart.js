import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

export default function ({ data }) {
  const screenWidth = Dimensions.get('window').width;

  const chartConfig2={
    backgroundColor: '#26872a',
    backgroundGradientFrom: '#43a047',
    backgroundGradientTo: '#66bb6a',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  const pieChartData = [
    { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 10 }
  ];

  return (
    <SafeAreaView>
      <PieChart
        data={pieChartData}
        height={256}
        width={screenWidth*0.9}
        paddingLeft={25}
        chartConfig={chartConfig}
        accessor="population"
        style={chartConfig.style}
      />
    </SafeAreaView>
  )
}