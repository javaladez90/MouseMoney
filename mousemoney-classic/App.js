// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { PurchaseProvider } from './context/PurchaseContext';

export default function App() {
  return (
    <PurchaseProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PurchaseProvider>
  );
}
