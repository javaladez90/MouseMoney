import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to MouseMoney!</Text>
            <Button title="Add Purchase" onPress={() => navigation.navigate('Add Purchase')} />
            <Button title="History" onPress={() => navigation.navigate('History')} />
            <Button title="Breakdown" onPress={() => navigation.navigate('Breakdown')} />
        </View>
    );
}