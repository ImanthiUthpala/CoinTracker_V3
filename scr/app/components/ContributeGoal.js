import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Colors from '../../../assets/Colors';
import { getGoalById, contributeToGoal } from '../../../BackEnd/db/Tables/goal';
import moment from 'moment';

const ContributeGoal = ({ route, navigation }) => {
  const { goalId } = route.params;
  const [goal, setGoal] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    async function fetchGoal() {
      try {
        const goalData = await getGoalById(goalId);
        setGoal(goalData);
      } catch (error) {
        console.error('Error fetching goal details: ', error);
      }
    }
    fetchGoal();
  }, [goalId]);

  const handleContribute = async () => {
    const contributionAmount = parseFloat(amount);
    if (isNaN(contributionAmount) || contributionAmount <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid contribution amount.');
      return;
    }

    try {
      await contributeToGoal(goalId, contributionAmount);
      navigation.goBack(); // Go back to the Goals screen
    } catch (error) {
      console.error('Error contributing to goal: ', error);
    }
  };

  if (!goal) {
    return <Text>Loading...</Text>;
  }

  const progress = goal.progress / goal.target_amount;
  const isExceeded = goal.progress > goal.target_amount;

  const currentDate = moment();
  const targetDate = moment(goal.due_date);
  const isOverdue = currentDate.isAfter(targetDate);
  const overdueDays = currentDate.diff(targetDate, 'days');

  return (
    <View style={styles.container}>
      <Text style={styles.goalName}>{goal.name}</Text>
      <Text style={styles.goalTarget}>Target: {goal.target_amount}</Text>
      <Text style={styles.goalProgress}>Progress: {goal.progress}</Text>
      <Text style={[styles.goalRemaining, isExceeded && styles.exceededText]}>
          {isExceeded ? 'Exceeded by: ' : 'Remaining: '}{Math.abs(goal.target_amount - goal.progress)}
        </Text>
      <View style={styles.row}>
        <Text style={styles.goalDueDate}>Due date: {new Date(goal.due_date).toDateString()}</Text>
      </View>
      {isOverdue && (
        <Text style={styles.overdueText}>
          Overdue by {overdueDays} {overdueDays === 1 ? 'day' : 'days'}
        </Text>
      )}
      <ProgressBar progress={progress} color={isExceeded ? Colors.RED : Colors.GREEN} style={styles.progressBar} />
      <TextInput
        style={styles.input}
        placeholder="Enter contribution amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.Button} onPress={handleContribute}>
        <Text style={styles.ButtonText}>Contribute</Text>
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
  goalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  goalTarget: {
    fontSize: 18,
    marginBottom: 5,
  },
  goalDueDate: {
    fontSize: 18,
    marginBottom: 5,
  },
  goalProgress: {
    fontSize: 18,
    marginBottom: 5,
    color: 'blue',
  },
  goalRemaining: {
    fontSize: 18,
    marginBottom: 15,
    color: 'green',
  },
  exceededText: {
    color: 'red',
  },
  overdueText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 15,
  },
  progressBar: {
    height: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  Button: {
    backgroundColor: Colors.GREEN,
    padding: 15,
    borderRadius: 10,
  },
  ButtonText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ContributeGoal;
