// screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { PurchaseContext } from '../context/PurchaseContext';

export default function HomeScreen({ navigation }) {
  const { purchases } = useContext(PurchaseContext);

  const totalSpent = purchases.reduce((sum, p) => sum + p.amount, 0);
  const today = new Date().toISOString().slice(0, 10);
  const todaySpent = purchases.filter(p => p.date.startsWith(today)).reduce((sum, p) => sum + p.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to MouseMoney</Text>
      <Text>Total Spent: ${totalSpent.toFixed(2)}</Text>
      <Text>Today's Spending: ${todaySpent.toFixed(2)}</Text>

      <Button title="Add Purchase" onPress={() => navigation.navigate('Add Purchase')} />
      <Button title="History" onPress={() => navigation.navigate('History')} />
      <Button title="Breakdown" onPress={() => navigation.navigate('Breakdown')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});