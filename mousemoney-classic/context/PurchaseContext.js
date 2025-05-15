// context/PurchaseContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem('purchases');
      if (stored) setPurchases(JSON.parse(stored));
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('purchases', JSON.stringify(purchases));
  }, [purchases]);

  const addPurchase = (purchase) => setPurchases(prev => [purchase, ...prev]);
  const clearPurchases = () => {
    AsyncStorage.removeItem('purchases');
    setPurchases([]);
  };

  return (
    <PurchaseContext.Provider value={{ purchases, addPurchase, clearPurchases }}>
      {children}
    </PurchaseContext.Provider>
  );
}