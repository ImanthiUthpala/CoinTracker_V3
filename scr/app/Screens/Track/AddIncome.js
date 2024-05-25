import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../../../assets/Colors';
import { insertIncome } from '../../../../BackEnd/db/Tables/income';


export const AddIncome = ({ route, navigation }) => {
  const { sourceId } = route.params;
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // Added state


  const handleAddIncome = async () => {
    try {
      await insertIncome(amount, date.toISOString(), sourceId );
      console.log('Income added successfully!');
      //navigation.navigate('Income');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount (Rs.)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={(value) => setAmount(value)}
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
        onChange={(event, selectedDate) => {
          setShowDatePicker(false); // hide date picker
          if(selectedDate){
            setDate(selectedDate);
          }
          
        }}
      />
      )}
      
      <TouchableOpacity style={styles.button} onPress={handleAddIncome}>
        <Text style={styles.buttonText}>Add Income</Text>
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
