import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getGoal, markGoalAsComplete } from '../../../BackEnd/db/Tables/goal';
import { ProgressBar } from 'react-native-paper';
import moment from 'moment';
import Colors from '../../../assets/Colors';

const GoalList = ({ goalList = [], handleDelete }) => {
  const navigation = useNavigation();

  const handleEdit = (goal) => {
    if (goal && goal.id) {
      navigation.navigate('UpdateGoal', { goalId: goal.id });
    } else {
      console.error('Invalid goal object');
    }
  };

  const handleContribute = (goal) => {
    if (goal && goal.id) {
      navigation.navigate('ContributeGoal', { goalId: goal.id });
    } else {
      console.error('Invalid goal object');
    }
  };

  const handleComplete = async (goal) => {
    if (goal && goal.id) {
      try {
        await markGoalAsComplete(goal.id);
        const updatedGoalList = [...goalList];
        const index = updatedGoalList.findIndex(g => g.id === goal.id);
        if (index !== -1) {
          updatedGoalList[index].completed = true;
          handleGoalListUpdate(updatedGoalList); // Assuming you have a function to update goal list in the parent component
        }
      } catch (error) {
        console.error('Error marking goal as complete: ', error);
      }
    } else {
      console.error('Invalid goal object');
    }
  };

  const confirmCompletion = (goal) => {
    Alert.alert(
      'Complete Goal',
      'Are you sure you want to mark this goal as completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => handleComplete(goal) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {goalList?.length > 0 && (
        <View>
          {goalList.map((goal, index) => (
            <View key={index} style={[styles.goalContainer, goal.completed && styles.completedContainer]}>
              <View style={styles.iconContainer}>
                {goal.icon && (
                  <Text style={[styles.iconText, { backgroundColor: goal?.color }]}>
                    {goal.icon}
                  </Text>
                )}
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.goalText}>{goal.name}</Text>
                <Text style={styles.targetText}>Target: {goal.target_amount}</Text>
                <Text style={styles.targetText}>Due Date: {new Date(goal.due_date).toDateString()}</Text>
                {goal.completed ? (
                  <Text style={[styles.completedText]}>Completed</Text>
                ) : (
                  <>
                    <Text style={styles.progressText}>Progress: {goal.progress}</Text>
                    <Text style={[styles.remainingText, goal.progress > goal.target_amount && styles.exceededText]}>
                      {goal.progress > goal.target_amount ? 'Exceeded by: ' : 'Remaining: '}{Math.abs(goal.target_amount - goal.progress)}
                    </Text>
                    <ProgressBar progress={goal.progress / goal.target_amount} color={Colors.GREEN} style={styles.progressBar} />
                    
                    <View style={styles.actionContainer}>
                      <TouchableOpacity onPress={() => handleContribute(goal)}>
                        <Text style={styles.actionText}>Contribute</Text>
                      </TouchableOpacity>
                      {!goal.completed && (
                        <TouchableOpacity onPress={() => confirmCompletion(goal)}>
                          <Text style={styles.actionText}>Set as Complete</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </>
                )}
              </View>
              <View style={styles.cardEdit}>
                {!goal.completed && (
                  <TouchableOpacity onPress={() => handleEdit(goal)}>
                    <FontAwesome6 name="edit" size={24} color="black" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => handleDelete(goal.id)}>
                  <MaterialIcons name="delete-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  goalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
   // padding: 1,
  },
  completedContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
   // marginTop: 50,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'baseline',
    padding: 6,
  },
  iconText: {
    fontSize: 20,
    padding: 16,
    borderRadius: 15,
    width:60,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    minHeight: 120, // Set a minimum height for the container
    marginBottom: 15, // Add margin bottom to create space between items
  },
  goalText: {
    fontSize: 18,
  },
  targetText: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  progressText: {
    fontSize: 16,
    color: Colors.BLUE,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  remainingText: {
    fontSize: 16,
    color: Colors.GREEN,
  },
  exceededText: {
    color: Colors.RED,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionText: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: Colors.ORANGE,
    borderRadius: 8,
    marginRight: 10,
  },
  // completeText: {
  //  // color: Colors.WHITE,
  //   backgroundColor: Colors.ORANGE,
  //   //padding: 20,
  //   borderRadius: 10,
  //   fontWeight: '900',
  //   width: 120,
  //   textAlign: 'center',
  //   alignSelf: 'center',
  // },
  cardEdit: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 11,
    gap: 15,
  },
  completedText: {
    color: Colors.WHITE,
    backgroundColor: Colors.GREEN,
    padding: 5,
    borderRadius: 10,
    fontWeight: '700',
    width: 90,
    height: 30,
    textAlign: 'center',
    alignSelf: 'auto',
    marginTop: 10,
  },
});

export default GoalList;
