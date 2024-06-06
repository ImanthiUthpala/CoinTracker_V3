import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../../../assets/Colors';
import { insertExpense } from '../../../../BackEnd/db/Tables/expense';
import {Expense} from './Expense';


export const AddExpense = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // Added state


  const handleAddExpense = async () => {
    try {
      await insertExpense(amount, date.toISOString(), categoryId );
      console.log('Expense added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount (Rs.)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => {
          const isValidInput = /^\d*\.?\d*$/.test(text); // Check for valid numeric input
          if (isValidInput || text === '') {
            setAmount(text);
          }
        }}
      />
      <Text style={styles.label}>Date</Text>
      <TouchableOpacity onPress={()=> setShowDatePicker(true)}>
        <Text style={styles.input}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
        value={date}
        mode="date"
        display="default"
        maximumDate={new Date()}
        onChange={(event, selectedDate) => {
          setShowDatePicker(false); // hide date picker
          if(selectedDate){
            setDate(selectedDate);
          }
          
        }}
      />
      )}
      
      <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: Colors.GREEN,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
  },
});
