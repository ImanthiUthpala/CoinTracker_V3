import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../../../assets/Colors';
import { getBillById, updateBill } from '../../../../BackEnd/db/Tables/bill';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPicker from '../../components/ColorPicker'; // Assuming you have a ColorPicker component

const UpdateBill = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { billId } = route.params;

  const [bill, setBill] = useState(null);
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState(Colors.PURPLE);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [reminderDate, setReminderDate] = useState(new Date());
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showReminderDatePicker, setShowReminderDatePicker] = useState(false);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const billDetails = await getBillById(billId);
        setBill(billDetails);
        setIcon(billDetails.icon || '');
        setColor(billDetails.color || Colors.PURPLE);
        setName(billDetails.name || '');
        setAmount(billDetails.amount ? billDetails.amount.toString() : '');
        setDueDate(new Date(billDetails.due_date));
        setReminderDate(new Date(billDetails.reminder_date));
      } catch (error) {
        console.error('Error fetching bill details: ', error);
      }
    }
    fetchBill();
  }, [billId]);

  const handleUpdateBill = async () => {
    if (!name || !amount || !dueDate || !reminderDate) {
      console.error('Please fill in all fields.');
      return;
    }

    try {
      await updateBill(billId, name, parseFloat(amount), dueDate.toISOString(), reminderDate.toISOString(), icon, color);
      console.log('Bill updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating bill:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {bill && (
        <View style={styles.iconColorContainer}>
          <TextInput
            style={[styles.iconInput, { backgroundColor: color }]}
            maxLength={2}
            value={icon}
            onChangeText={setIcon}
          />
          <ColorPicker selectedColor={color} setSelectedColor={setColor} />
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bill Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Bill Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => {
            const isValidInput = /^\d*\.?\d*$/.test(text); // Check for valid numeric input
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
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateBill}>
        <Text style={styles.updateButtonText}>Update Bill</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50, // Added padding to avoid hiding behind the bottom tab navigator
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
    marginVertical: 5,
  },
  updateButton: {
    backgroundColor: Colors.GREEN,
    padding: 15,
    borderRadius: 10,
  },
  updateButtonText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: 18,
  },
});

export default UpdateBill;
