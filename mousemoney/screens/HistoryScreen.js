import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { PurchaseContext } from '../context/PurchaseContext';

export default function HistoryScreen() {
  const { purchases } = useContext(PurchaseContext);

  // Optional: sort newest first
  const sorted = [...purchases].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
      </View>
      <Text style={styles.meta}>
        {item.category} • {item.park}
      </Text>
      <Text style={styles.date}>
        {new Date(item.date).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {sorted.length === 0 ? (
        <Text style={styles.empty}>No purchases yet.</Text>
      ) : (
        <FlatList
          data={sorted}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: { textAlign: 'center', marginTop: 40, color: '#555' },
  item: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 12,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: '600' },
  amount: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#777', marginTop: 4 },
  date: { color: '#aaa', marginTop: 2, fontSize: 12 },
});
