import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from '../src/stacks/AuthStack';
import { currentUser } from '../api/auth';
import FeatureStack from '../src/stacks/FeatureStack';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        {currentUser() ? <AuthStack /> : <FeatureStack />}
      </NavigationContainer>
    </PaperProvider>
  );
}

