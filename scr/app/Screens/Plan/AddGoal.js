import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../../assets/Colors';
import ColorPicker from '../../components/ColorPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { insertGoal } from '../../../../BackEnd/db/Tables/goal';

const AddGoal = ({ route }) => {
  const navigation = useNavigation();
  const [icon, setIcon] = useState('Gl');
  const [color, setColor] = useState(Colors.PURPLE);
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [initialContribution, setInitialContribution] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);


  const handleAddGoal = async () => {
    console.log('Add goal button clicked');

    if (!name || !targetAmount || !dueDate || !initialContribution) {
      console.error('Please fill in all fields.');
      return;
    }

    try {
      console.log('Inserting goal...');
      insertGoal(name, parseFloat(targetAmount), dueDate.toISOString(), icon, color);
      console.log('Goal added successfully!');
      navigation.goBack();

      setName('');
      setIcon('Gl');
      setColor(Colors.PURPLE);
      setTargetAmount('');
      setDueDate(new Date());
      
    } catch (error) {
      console.error('Error adding goal:', error);
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
        <TextInput
          style={styles.input}
          placeholder="Goal Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Target Amount"
          keyboardType="numeric"
          value={targetAmount}
          onChangeText={setTargetAmount}
        />
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.input}>{dueDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode='date'
            display='default'
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDueDate(selectedDate);
              }
            }}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Initial Contribution"
          keyboardType="numeric"
          value={initialContribution}
          onChangeText={setInitialContribution}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddGoal}>
        <Text style={styles.addButtonText}>Add Goal</Text>
      </TouchableOpacity>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50, // Added padding to avoid hiding behind the bottom tab navigator
  },
  iconColorContainer: {
    //flexDirection: 'row',
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

export default AddGoal;
