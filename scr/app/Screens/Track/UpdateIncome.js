import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../../../assets/Colors';
import { updateIncome, getIncomeById } from '../../../../BackEnd/db/Tables/income';

export const UpdateIncome = ({ route, navigation }) => {
  const { incomeId } = route.params;
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sourceId, setSourceId] = useState(null);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const income = await getIncomeById(incomeId);
        if (income) {
          setAmount(income.amount.toString());
          setDate(new Date(income.date));
          setSourceId(income.source_id);
        }
      } catch (error) {
        console.error('Error fetching income:', error);
      }
    };
    fetchIncome();
  }, [incomeId]);

  const handleUpdateIncome = async () => {
    try {
      await updateIncome(incomeId, amount, date.toISOString(), sourceId);
      console.log('Income updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating income:', error);
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
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.input}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleUpdateIncome}>
        <Text style={styles.buttonText}>Update Income</Text>
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

//export default UpdateIncome;
