// AddIncomeModal.js
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export const AddIncomeModal = ({ onClose }) => {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  

  const handleSaveIncome = () => {
    // Save income to the database
    // Use selectedSource, selectedCategory, date, amount
    // Close the modal after saving
    onClose();
  };

  return (
    <View>
      <Text>Add Income</Text>
      {/* Date picker */}
      {/* Amount input */}
      {/* Source selection */}
     
      <Button title="Save" onPress={handleSaveIncome} />
      <Button title="Cancel" onPress={onClose} />
    </View>
  );
};


