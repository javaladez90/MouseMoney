import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { PurchaseContext } from '../context/PurchaseContext';

export default function AddPurchase({ navigation }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Food');
  const [park, setPark] = useState('Disneyland');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const { addPurchase } = useContext(PurchaseContext);

  const handleSubmit = () => {
    if (!title || !amount) {
      Alert.alert('Missing Info', 'Please enter both a title and amount.');
      return;
    }

    const newPurchase = {
      id: uuid.v4(),
      title,
      category,
      park,
      amount: parseFloat(amount),
      notes,
      date: new Date().toISOString(),
    };

    addPurchase(newPurchase);
    Alert.alert('Saved!', 'Purchase added.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="e.g. Churro"
      />

      <Text style={styles.label}>Amount ($)</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        placeholder="e.g. 5.00"
        keyboardType="decimal-pad"
      />

<Text style={styles.label}>Category</Text>
<View style={styles.pickerWrapper}>
  <Picker
    selectedValue={category}
    onValueChange={setCategory}
    style={styles.picker}
  >
    <Picker.Item label="Food" value="Food" />
    <Picker.Item label="Merch" value="Merch" />
    <Picker.Item label="Tickets" value="Tickets" />
    <Picker.Item label="Other" value="Other" />
  </Picker>
</View>

<Text style={styles.label}>Park</Text>
<View style={styles.pickerWrapper}>
  <Picker
    selectedValue={park}
    onValueChange={setPark}
    style={styles.picker}
  >
    <Picker.Item label="Disneyland" value="Disneyland" />
    <Picker.Item label="California Adventure" value="California Adventure" />
    <Picker.Item label="Magic Kingdom" value="Magic Kingdom" />
    <Picker.Item label="Epcot" value="Epcot" />
    <Picker.Item label="Other" value="Other" />
  </Picker>
</View>


      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        style={styles.input}
        placeholder="e.g. Treat for kids"
      />

      <Button title="Save Purchase" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
pickerWrapper: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  marginBottom: 12,
  overflow: 'hidden',
},
picker: {
  height: 50,
  width: '100%',
},


});
