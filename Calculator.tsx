import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | string>('null');

  const calculate = (operation: string) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) return;

    switch (operation) {
      case '+': setResult(a + b); break;
      case '-': setResult(a - b); break;
      case '*': setResult(a * b); break;
      case '/': setResult(b !== 0 ? a / b : 'Error'); break;
    }
  };

  return (
    <View style={styles.gradientBg}>
      <View style={styles.headerCard}>
        <Text style={styles.headerText}>🧮 QuickCalc</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={num1}
          onChangeText={setNum1}
          placeholder="First number"
          placeholderTextColor="#7a7a7a"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={num2}
          onChangeText={setNum2}
          placeholder="Second number"
          placeholderTextColor="#7a7a7a"
        />
        <View style={styles.buttons}>
          <View style={styles.buttonRow}>
            <CalcButton label="+" onPress={() => calculate('+')} />
            <CalcButton label="-" onPress={() => calculate('-')} />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton label="×" onPress={() => calculate('*')} />
            <CalcButton label="÷" onPress={() => calculate('/')} />
          </View>
        </View>
        <Text style={styles.resultText}>Result: {result}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
    backgroundColor: '#f7f6e7', // soft off-white
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    minHeight: '100%',
  },
  headerCard: {
    alignSelf: 'center',
    backgroundColor: '#f9d29d',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 18,
    shadowColor: '#eab676',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#7a4f01',
    letterSpacing: 1.2,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Bold' : 'sans-serif-medium',
  },
  container: {
    padding: 22,
    marginHorizontal: 18,
    backgroundColor: '#fffbe9',
    borderRadius: 24,
    elevation: 7,
    shadowColor: '#eab676',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    marginBottom: 24,
  },
  input: {
    height: 52,
    borderColor: '#eab676',
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 18,
    fontSize: 19,
    marginBottom: 18,
    backgroundColor: '#fff',
    color: '#7a4f01',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif',
  },
  buttons: {
    marginVertical: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 12,
  },
  resultText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#eab676',
    padding: 13,
    borderRadius: 14,
    marginTop: 18,
    textAlign: 'center',
    elevation: 2,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Bold' : 'sans-serif-medium',
    letterSpacing: 1.1,
    shadowColor: '#eab676',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
  },
});

// Custom button for calculator
const CalcButton = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={calcBtnStyles.btn}
  >
    <Text style={calcBtnStyles.label}>{label}</Text>
  </TouchableOpacity>
);

const calcBtnStyles = StyleSheet.create({
  btn: {
    backgroundColor: '#f9d29d',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginHorizontal: 6,
    shadowColor: '#eab676',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 56,
    alignItems: 'center',
  },
  label: {
    color: '#7a4f01',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1.1,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Bold' : 'sans-serif-medium',
  },
});

export default Calculator;
