import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getGoal, deleteGoal, contributeToGoal, setGoalAsComplete } from '../../../../BackEnd/db/Tables/goal';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import GoalList from '../../components/GoalList';

export const Goal = () => {
  const [goals, setGoals] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchGoals = async () => {
    try {
      const data = await getGoal();
      console.log('Fetched Goal data: ', data);
      if (Array.isArray(data)) {
        setGoals(data);
      } else {
        console.error('Data received from getGoals is not an array: ', data);
        setGoals([]);
      }
    } catch (error) {
      console.error('Error fetching goals: ', error);
      setGoals([]);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this goal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', onPress: async () => {
            try {
              await deleteGoal(id);
              fetchGoals(); // Refresh the list after deletion
            } catch (error) {
              console.error('Error deleting goal: ', error);
            }
          }
        },
      ]
    );
  };

  // const handleContribute = (goal) => {
  //   if (goal && goal.id) {
  //     navigation.navigate('ContributeGoal', {goalId: goal.id});
  //   } else {
  //     console.error('Invalid goal object');
  //   }
  // };

  const handleComplete = async (goal) => {
    try {
      await setGoalAsComplete(goal.id);
      fetchGoals(); // Refresh the list after marking as complete
    } catch (error) {
      console.error('Error setting goal as complete: ', error);
    }
  };

  const handlePress = () => {
    navigation.navigate('AddGoal');
  };

  useEffect(() => {
    if (isFocused) {
      fetchGoals();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.titleText}>Your Goals</Text>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>

          <GoalList goalList={goals} handleDelete={handleDelete}  />
          <View style={{ height: 280 }} />
        </ScrollView>
        <TouchableOpacity
          onPress={handlePress}
          style={styles.addBtn}
        >
          <Ionicons name="add-circle-sharp" size={60} color="#82E80B" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82E80B',
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: '#82E80B',
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollViewContent: {
    padding: 10,
    paddingBottom: 100,
  },
  addBtn: {
    position: 'absolute',
    top: 330,
    right: 5,
  },
});

//export default Goals;
