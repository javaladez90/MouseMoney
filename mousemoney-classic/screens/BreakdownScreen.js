// screens/BreakdownScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PurchaseContext } from '../context/PurchaseContext';
import { PieChart } from 'react-native-chart-kit';

export default function BreakdownScreen() {
  const { purchases } = useContext(PurchaseContext);

  const categoryTotals = purchases.reduce((acc, purchase) => {
    acc[purchase.category] = (acc[purchase.category] || 0) + purchase.amount;
    return acc;
  }, {});

  const chartData = Object.keys(categoryTotals).map((category, index) => ({
    name: category,
    amount: categoryTotals[category],
    color: chartColors[index % chartColors.length],
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending by Category</Text>
      {chartData.length === 0 ? <Text>No data yet.</Text> : (
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}
    </View>
  );
}

const chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
});
