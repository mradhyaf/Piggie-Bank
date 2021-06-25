import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Text } from 'react-native-paper';

export default function BudgetProgress() {
  const budget = 1000 ;

  const chartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const data = {
    data: [0.7]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your budget this month:</Text>
      <ProgressChart
        data={data}
        width={160}
        height={160}
        strokeWidth={16}
        radius={64}
        chartConfig={chartConfig}
        hideLegend={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
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