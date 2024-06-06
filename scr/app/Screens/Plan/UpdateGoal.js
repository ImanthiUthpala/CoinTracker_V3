import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../../../../assets/Colors';
import ColorPicker from '../../components/ColorPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateGoal, getGoalById } from '../../../../BackEnd/db/Tables/goal';

const UpdateGoal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goalId } = route.params;

  const [goal, setGoal] = useState(null);
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState(Colors.PURPLE);
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [initialContribution, setInitialContribution] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    async function fetchGoalDetails() {
      try {
        const goalDetails = await getGoalById(goalId);
        setGoal(goalDetails);
        setIcon(goalDetails.icon || '');
        setColor(goalDetails.color || Colors.PURPLE);
        setName(goalDetails.name || '');
        setTargetAmount(goalDetails.target_amount.toString() || '');
        setDueDate(new Date(goalDetails.due_date));
        setInitialContribution(goalDetails.progress.toString() || '');
      } catch (error) {
        console.error('Error fetching goal details: ', error);
      }
    }
    fetchGoalDetails();
  }, [goalId]);

  const handleUpdateGoal = async () => {
    if (!name || !targetAmount || !dueDate || !initialContribution) {
      console.error('Please fill in all fields.');
      return;
    }

    try {
      await updateGoal(goalId, name, parseFloat(targetAmount), dueDate.toISOString(), icon, color, parseFloat(initialContribution));
      console.log('Goal updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating goal:', error);
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
        <Text style={styles.label}>Goal Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Goal Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Target Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Target Amount"
          keyboardType="numeric"
          value={targetAmount}
          onChangeText={(text) => {
            const isValidInput = /^\d*\.?\d*$/.test(text); // Check for valid numeric input
            if (isValidInput || text === '') {
              setTargetAmount(text);
            }
          }}
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
            minimumDate={new Date()} // Prevent selecting a date before the current date
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDueDate(selectedDate);
              }
            }}
          />
        )}
        <Text style={styles.label}>Progress</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Initial Contribution"
          keyboardType="numeric"
          value={initialContribution}
          onChangeText={(text) => {
            const isValidInput = /^\d*\.?\d*$/.test(text);
            if (isValidInput || text === '') {
              setInitialContribution(text);
            }
          }}
        />
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateGoal}>
        <Text style={styles.updateButtonText}>Update Goal</Text>
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
    //color: Colors.GRAY,
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

export default UpdateGoal;
