import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const WeightConverter = () => {
  const [kg, setKg] = useState('');
  const pounds = kg ? (parseFloat(kg) * 2.20462).toFixed(2) : '';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter weight in Kg: </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={kg}
        onChangeText={setKg}
      />
      <Text style={styles.resultText}>Weight in Pounds: {pounds} lbs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 15,
    backgroundColor: '#fffbeb',
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 14,
    fontWeight: '600',
    color: '#92400e',
  },
  input: {
    height: 50,
    borderColor: '#f59e0b',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    color: '#78350f',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#d97706',
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
    textAlign: 'center',
    elevation: 3,
  },
});

export default WeightConverter;
