import React, {  useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import Screen from '../components/Screen';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';
import { useSelector } from "react-redux";
import { selectExpenses } from '../store/expensesSlice';
// import { readExpense } from '../../api/expenses'
import { Dimensions} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

export default function StatisticsScreen({ navigation }) {
  const screenWidth = Dimensions.get('window').width
  const [expenses, setExpenses] = useState([])
  // readExpense(val => {if (val) setExpenses(Object.values(val))}, console.error)
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

  const pieChartData = [
    { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 10 }
  ];

  const chartConfig={
     backgroundColor: "#ffffff",
     backgroundGradientFrom: "#ffffff",
     backgroundGradientTo: "#ffffff",
     fillShadowGradient: 'black',
     fillShadowGradientOpacity: 0.5,
     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  };

  const chartConfig2={
    backgroundColor: '#26872a',
    backgroundGradientFrom: '#43a047',
    backgroundGradientTo: '#66bb6a',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  }

  const chartConfig3={
    backgroundColor: '#b90602',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  }

  return (
    <Screen title="Statistics">
      <SwiperFlatList showPagination paginationStyle={{marginVertical:0}} paginationActiveColor='black'>
        <SafeAreaView>
          <BarChart
            data={data}
            width={screenWidth*0.98}
            height={256}
            yAxisLabel="$"
            chartConfig={chartConfig}
            showValuesOnTopOfBars={true}/>
        </SafeAreaView>
        <SafeAreaView>
          <PieChart
            data={pieChartData}
            height={256}
            width={screenWidth*0.98}
            paddingLeft={25}
            chartConfig={chartConfig2}
            accessor="population"
            style={chartConfig2.style}
          />
        </SafeAreaView>
          <LineChart
            data={data}
            width={screenWidth*0.9}
            height={256}
            yAxisLabel='$'
            chartConfig={chartConfig3}
            style={chartConfig3.style}
            />
      </SwiperFlatList>
    </Screen>
  )
}