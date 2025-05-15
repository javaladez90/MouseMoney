// screens/AddPurchaseScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { v4 as uuidv4 } from 'uuid';
import { PurchaseContext } from '../context/PurchaseContext';

export default function AddPurchaseScreen({ navigation }) {
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
      id: uuidv4(),
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
      <Text>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text>Amount</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="decimal-pad" />
      <Text>Category</Text>
      <Picker selectedValue={category} onValueChange={setCategory} style={styles.input}>
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Merch" value="Merch" />
        <Picker.Item label="Tickets" value="Tickets" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
      <Text>Park</Text>
      <Picker selectedValue={park} onValueChange={setPark} style={styles.input}>
        <Picker.Item label="Disneyland" value="Disneyland" />
        <Picker.Item label="California Adventure" value="California Adventure" />
        <Picker.Item label="Magic Kingdom" value="Magic Kingdom" />
        <Picker.Item label="Epcot" value="Epcot" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
      <Text>Notes</Text>
      <TextInput style={styles.input} value={notes} onChangeText={setNotes} />
      <Button title="Save Purchase" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6, marginBottom: 12 },
});