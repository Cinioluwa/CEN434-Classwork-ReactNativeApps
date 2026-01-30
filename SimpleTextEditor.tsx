import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const SimpleTextEditor = () => {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');

  const saveText = () => setSavedText(text);
  const clearText = () => {
    setText('');
    setSavedText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        value={text}
        onChangeText={setText}
        placeholder="Type your text here..."
      />
      <View style={styles.buttons}>
        <Button title="Save" onPress={saveText} />
        <Button title="Clear" onPress={clearText} />
      </View>
      <Text style={styles.resultText}>Saved Text: {savedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 15,
    backgroundColor: '#faf5ff',
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: '#8b5cf6',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    color: '#5b21b6',
    textAlignVertical: 'top',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#7c3aed',
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
    textAlign: 'center',
    elevation: 3,
  },
});

export default SimpleTextEditor;
