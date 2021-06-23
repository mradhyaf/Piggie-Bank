import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider } from 'react-redux';

import { getCurrentUserId, setOnAuthStateChanged } from './api/auth';
import AuthStack from './src/stacks/AuthStack';
import MainStack from './src/stacks/MainStack';
import { store } from './src/store'

const RootStack = createStackNavigator();
const RootStackComponent = ({ userId }) => (
  <RootStack.Navigator headerMode='none'>
    {userId ? (
      <RootStack.Screen name="mainStack" component={MainStack} />
      ) : (
      <RootStack.Screen name="authStack" component={AuthStack} />
    ) }
  </RootStack.Navigator>
)

export default function App() {
  const [userId, setUserId] = useState(null);

  setOnAuthStateChanged((user) => setUserId(user.uid), () => setUserId(null));

  return (
    <StoreProvider store={store} >
      <PaperProvider>
        <NavigationContainer>
          <RootStackComponent userId={userId} />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

