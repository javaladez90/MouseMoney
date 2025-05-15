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
      <View style={styles.card}>
        <Text style={styles.stat}>Total Spent: ${totalSpent.toFixed(2)}</Text>
        <Text style={styles.stat}>Today's Spending: ${todaySpent.toFixed(2)}</Text>
      </View>
      <Button title="Add Purchase" onPress={() => navigation.navigate('Add Purchase')} />
      <Button title="History" onPress={() => navigation.navigate('History')} />
      <Button title="Breakdown" onPress={() => navigation.navigate('Breakdown')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', padding: 20, alignItems: 'center', justifyContent: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 24,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stat: { fontSize: 16, marginBottom: 8 },
});