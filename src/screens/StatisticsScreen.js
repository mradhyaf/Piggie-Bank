import React, {  useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { useSelector } from "react-redux";
import { selectExpenses } from '../store/expensesSlice';
import { Dimensions} from 'react-native';

export default function Chart({ navigation }) {
  const screenWidth = Dimensions.get('window').width
  const expenses = useSelector(selectExpenses);
  const reducer = (accumulator, data) => accumulator + Number(data.price);
  const c = (category) => expenses.filter(expense => expense.category === category).reduce(reducer, 0);
  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        data: [c("1"), c("2"), c("3"), c("4"), c("5"), c("6")],
      }
    ]
  };
  const chartConfig={
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar>
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => navigation.openDrawer()}
          />
          <Appbar.Content
            title="Bar Chart"
          />
        </Appbar>
        <BarChart data={data} yAxisLabel="$"   width={screenWidth}
                                               height={220}
                                               yAxisLabel="$"
                                               chartConfig={chartConfig}
                                               verticalLabelRotation={30}/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})