import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [purchases, setPurchases] = useState([]);

  // Load purchases from storage on app start
  useEffect(() => {
    const loadPurchases = async () => {
      try {
        const stored = await AsyncStorage.getItem('purchases');
        if (stored) {
          setPurchases(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load purchases', error);
      }
    };
    loadPurchases();
  }, []);

  // Save to storage whenever purchases change
  useEffect(() => {
    const savePurchases = async () => {
      try {
        await AsyncStorage.setItem('purchases', JSON.stringify(purchases));
      } catch (error) {
        console.error('Failed to save purchases', error);
      }
    };
    if (purchases.length) {
      savePurchases();
    }
  }, [purchases]);

  const addPurchase = (purchase) => {
    setPurchases((prev) => [purchase, ...prev]);
  };

  const clearPurchases = async () => {
    await AsyncStorage.removeItem('purchases');
    setPurchases([]);
  };

  return (
    <PurchaseContext.Provider value={{ purchases, addPurchase, clearPurchases }}>
      {children}
    </PurchaseContext.Provider>
  );
}
