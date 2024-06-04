import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../../assets/Colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getGoal, contributeToGoal } from '../../../BackEnd/db/Tables/goal';
import { ProgressBar } from 'react-native-paper';
import moment from 'moment';

const GoalList = ({ goalList = [], handleDelete, handleComplete }) => {

  const navigation = useNavigation();

  const [goalData, setGoalData] = useState([]);

  useEffect(() => {
    async function fetchGoalData() {
      try {
        const data = await getGoal();
        setGoalData(data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    }
    fetchGoalData();
  }, []);

  if (!goalList || goalList.length === 0) {
    return <Text>No goal data available</Text>
  }

  const handleEdit = (goal) => {
    if (goal && goal.id) {
      navigation.navigate('UpdateGoal', { goalId: goal.id });
    } else {
      console.error('Invalid goal object');
    }
  };

  const handleContribute = (goal) => {
    if (goal && goal.id) {
      navigation.navigate('ContributeGoal', {goalId: goal.id});
    } else {
      console.error('Invalid goal object');
    }
  };


  return (
    <View style={styles.container}>
  {goalList?.length > 0 && (
    <View>
      {goalList.map((goal, index) => {
        const progress = goal.progress / goal.target_amount;
        const isExceeded = goal.progress > goal.target_amount;

        const currentDate = moment();
        const dueDate = moment(goal.due_date);
        const isOverdue = currentDate.isAfter(dueDate);
        const overDueDays = currentDate.diff(dueDate, 'days');

        return (
          <TouchableOpacity
            key={index}
            style={styles.container}
          >
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
              <Text style={styles.progressText}>Progress: {goal.progress}</Text>
              <Text style={[styles.remainingText, isExceeded && styles.exceededText]}>
                {isExceeded ? 'Exceeded by: ' : 'Remaining: '}{Math.abs(goal.target_amount - goal.progress)}
              </Text>
              {isOverdue && (
                <Text style={styles.overdueText}>
                  Overdue by {overDueDays} {overDueDays ===1 ? 'day' : 'days'}
                </Text>
              )}
              <View style={styles.progressBarContainer}>
                <ProgressBar progress={progress} color={isExceeded ? Colors.RED : Colors.GREEN} style={styles.progressBar} />
              </View>

              

                <View style={styles.actionContainer}>
                  <TouchableOpacity onPress={() => handleContribute(goal)}>
                    <Text style={styles.contributeText}>Contribute</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleComplete(goal)}>
                    <Text style={styles.completeText}>Set as Complete</Text>
                  </TouchableOpacity>
                </View>
              
            </View>

            <View style={styles.cardEdit}>
                
                  <TouchableOpacity onPress={() => handleEdit(goal)}>
                    <FontAwesome6 name="edit" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(goal.id)}>
                    <MaterialIcons name="delete-outline" size={24} color="black" />
                  </TouchableOpacity>
               
                </View>
          </TouchableOpacity>
        );
      })}
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
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '97%',
    backgroundColor: Colors.WHITE,
    padding: 2,
    borderRadius: 15,
    height: 170,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  iconText: {
    fontSize: 20,
    padding: 16,
    borderRadius: 15,
    width: 60,
  },
  detailsContainer: {
    display: 'flex',
    flex: 1,
    marginLeft: 10,
    height: 150,
  },
  goalText: {
    fontSize: 18,
  },
  targetText: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  overdueText: {
    fontSize: 16,
    color: 'red',
  },
  progressText: {
    fontSize: 16,
    color: 'blue',
  },
  remainingText: {
    fontSize: 16,
    color: 'green',
  },
  exceededText: {
    color: 'red',
  },
  progressBarContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 10,
  },
   cardEdit: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 11,
    gap: 15,
  },
  actionContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contributeText: {
    color: Colors.BLACK,
    backgroundColor: Colors.ORANGE,
    padding: 5,
    borderRadius: 10,
    fontWeight: '700',
    width: 90,
    height: 48,
    textAlign: 'center',
    marginRight: 10,
    //verticalAlign: 'auto',
  },
  completeText: {
    color: Colors.BLACK,
    backgroundColor: Colors.GREEN,
    padding: 5,
    borderRadius: 10,
    fontWeight: '700',
    width: 90,
    height: 48,
    textAlign: 'center',
  },
});

export default GoalList;
