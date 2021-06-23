import React, {  useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Pie } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { selectExpenses } from '../store/expensesSlice';

export default function Chart({ navigation }) {
  const expenses = useSelector(selectExpenses);
  const reducer = (accumulator, data) => accumulator + Number(data.price);
  const c = (category) => expenses.filter(expense => expense.category === category).reduce(reducer, 0);
  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '$',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4',
          '#30D5C8'
        ],
        hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F',
          '#501800'
        ],
        data: [c("1"), c("2"), c("3"), c("4"), c("5"), c("6")]
      }
    ],
  };
  const options = {
    radius:'70%',
    plugins:{
      title:{
        display:true,
        text:'Amount spent per category',
        fontSize:20
      },
      legend:{
        display:true,
        position:'right'
      }
    }
  };

  return (
    <ScrollView>
      <Appbar>
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content
          title="Pie Chart"
        />
      </Appbar>
      <Pie data={data} options={options} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})