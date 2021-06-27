import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import ExpensesScreen from '../screens/ExpensesScreen';
import CategoryScreen from '../screens/CategoryScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Main" headerMode="none" >
      <Stack.Screen name={"Main"} component={ExpensesScreen} />
      <Stack.Screen name={"Food"} >
        {(props) => <CategoryScreen {...props} category={"Food"} />}
      </Stack.Screen>
      <Stack.Screen name={"Transportation"} >
        {(props) => <CategoryScreen {...props} category={"Transportation"} />}
      </Stack.Screen>
      <Stack.Screen name={"Utilities"} >
        {(props) => <CategoryScreen {...props} category={"Utilities"} />}
      </Stack.Screen>
      <Stack.Screen name={"Personal"} >
        {(props) => <CategoryScreen {...props} category={"Personal"} />}
      </Stack.Screen>
      <Stack.Screen name={"Others"} >
        {(props) => <CategoryScreen {...props} category={"Others"} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
