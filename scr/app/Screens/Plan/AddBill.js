import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../../assets/Colors';
import ColorPicker from '../../components/ColorPicker'; // Assuming you have a ColorPicker component
import { insertBill } from '../../../../BackEnd/db/Tables/bill';

const AddBill = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [reminderDate, setReminderDate] = useState(new Date());
  const [icon, setIcon] = useState('Bi');
  const [color, setColor] = useState(Colors.PURPLE);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showReminderDatePicker, setShowReminderDatePicker] = useState(false);

  const handleAddReminder = async () => {
    if (!name || !amount || !dueDate || !reminderDate || !icon || !color) {
      console.error('Please fill in all fields.');
      return;
    }

    try {
      await insertBill(name, parseFloat(amount), dueDate.toISOString(), reminderDate.toISOString(), icon, color, false); // Ensuring paid is set to false
      navigation.goBack();
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.iconColorContainer}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: color }]}
          maxLength={2}
          value={icon}
          onChangeText={setIcon}
        />
        <ColorPicker selectedColor={color} setSelectedColor={setColor} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bill Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Bill Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => {
            const isValidInput = /^\d*\.?\d*$/.test(text);
            if (isValidInput || text === '') {
              setAmount(text);
            }
          }}
        />
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity onPress={() => setShowDueDatePicker(true)}>
          <Text style={styles.input}>{dueDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDueDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode='date'
            display='default'
            onChange={(event, selectedDate) => {
              setShowDueDatePicker(false);
              if (selectedDate) {
                setDueDate(selectedDate);
              }
            }}
          />
        )}
        <Text style={styles.label}>Reminder Date</Text>
        <TouchableOpacity onPress={() => setShowReminderDatePicker(true)}>
          <Text style={styles.input}>{reminderDate.toDateString()}</Text>
        </TouchableOpacity>
        {showReminderDatePicker && (
          <DateTimePicker
            value={reminderDate}
            mode='date'
            display='default'
            minimumDate={new Date()} // Prevent selecting a date before the current date
            maximumDate={dueDate} // Prevent selecting a date after the due date
            onChange={(event, selectedDate) => {
              setShowReminderDatePicker(false);
              if (selectedDate) {
                setReminderDate(selectedDate);
              }
            }}
          />
        )}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
        <Text style={styles.addButtonText}>Add Reminder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  iconColorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconInput: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    borderRadius: 100,
    marginRight: 20,
    paddingHorizontal: 28,
    color: Colors.WHITE,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: Colors.GREEN,
    padding: 15,
    borderRadius: 10,
  },
  addButtonText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: 18,
  },
});

export default AddBill;
