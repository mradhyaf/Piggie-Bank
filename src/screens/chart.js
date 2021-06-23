import React, {  useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Bar } from 'react-chartjs-2';

const rand = () => Math.floor(Math.random() * 255);

const genData = () => ({
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
  ],
});

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default function Chart({ navigation }) {
  const [data, setData] = useState(genData());

  return (
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
      <Bar data={data} options={options} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})