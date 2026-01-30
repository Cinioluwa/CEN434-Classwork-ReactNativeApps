import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

interface Expense {
  id: number;
  desc: string;
  amount: number;
}

const PersonalBudgetApp = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    setBalance(income - totalExpenses);
  }, [income, expenses]);

  const addExpense = () => {
    if (description && amount) {
      setExpenses([...expenses, { id: Date.now(), desc: description, amount: parseFloat(amount) }]);
      setDescription('');
      setAmount('');
    }
  };

  // Snippet for querying a web service (e.g., external bank accounts)
  // This fetches mock transaction data from a placeholder API and adds to expenses
  const fetchBankTransactions = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Placeholder for bank API
      const data = await response.json();
      // Assuming data is transactions: map to expenses (in real app, parse amounts in Naira)
      const newExpenses = data.slice(0, 3).map((item: any, index: number) => ({
        id: Date.now() + index,
        desc: `Transaction ${item.id}`,
        amount: Math.random() * 100, // Mock amount
      }));
      setExpenses(prevExpenses => [...prevExpenses, ...newExpenses]);
    } catch (error) {
      console.error(error);
    }
  };

  const renderExpense = ({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseDesc}>{item.desc}</Text>
      <Text style={styles.expenseAmount}>₦{item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Budget App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter monthly income"
        keyboardType="numeric"
        value={income.toString()}
        onChangeText={(text) => setIncome(parseFloat(text) || 0)}
      />
      <Text style={styles.balance}>Balance: ₦{balance.toFixed(2)}</Text>
      <TextInput
        style={styles.input}
        placeholder="Expense description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Expense amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <View style={styles.buttonRow}>
        <Button title="Add Expense" onPress={addExpense} />
        <Button title="Fetch Transactions" onPress={fetchBankTransactions} />
      </View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderExpense}
        style={styles.expenseList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 15,
    backgroundColor: '#fef2f2',
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: '#991b1b',
    textDecorationLine: 'underline',
  },
  input: {
    height: 50,
    borderColor: '#ef4444',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 14,
    backgroundColor: '#ffffff',
    color: '#7f1d1d',
  },
  balance: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 12,
    marginBottom: 18,
    textAlign: 'center',
    elevation: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  expenseList: {
    marginTop: 18,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  expenseDesc: {
    fontSize: 18,
    color: '#374151',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
  },
});

export default PersonalBudgetApp;