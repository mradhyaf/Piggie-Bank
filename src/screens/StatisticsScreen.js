import React, {  useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, FlatList } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import Screen from '../components/Screen';
import { BarChart } from 'react-native-chart-kit';
import { useSelector } from "react-redux";
import { selectExpenses } from '../store/expensesSlice';
import { Dimensions} from 'react-native';

export default function StatisticsScreen({ navigation }) {
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

  const renderItem = (item) => (
    <List.Item
      style={styles.item}
      title={item.title}
      description={item.description}
      right={() =>
      <View style={{flexDirection: 'row'}}>
        <PriceTag value={item.price} />
        <Button icon={'trash-can-outline'} onPress={() => handleDelete(item.key)} />
      </View>}
    />
  );
  

  return (
    <Screen title="Statistics" enableAppbar={true}>
      <View style={styles.chart}>
        {/* <BarChart 
        data={data} 
        yAxisLabel="$"   
        width={screenWidth}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}/> */}
        <Text>Chart here</Text>
      </View>
      <View style={styles.list}>
        <Text>List here</Text>
        <FlatList />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  chart: {
    flex: 4,
    borderColor: 'red',
    borderWidth: StyleSheet.hairlineWidth,
  },
  list: {
    flex: 8,
    borderColor: 'blue',
    borderWidth: StyleSheet.hairlineWidth,
  },
  listItem: {
    borderColor: 'blue',
    borderWidth: StyleSheet.hairlineWidth,
    
  }
})