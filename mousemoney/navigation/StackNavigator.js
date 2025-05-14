import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddPurchaseScreen from '../screens/AddPurchaseScreen';
import BreakdownScreen from '../screens/BreakdownScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="MouseMoney" component={HomeScreen} />
            <Stack.Screen name="Add Purchase" component={AddPurchaseScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Breakdown" component={BreakdownScreen} />
        </Stack.Navigator>
    );
}