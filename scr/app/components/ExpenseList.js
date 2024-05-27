import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../../assets/Colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ExpenseList = ({ expenseList, handleDelete}) => {
  const navigation = useNavigation();

  const handleEdit = (expense) => {
    if (expense && expense.id){
      navigation.navigate('UpdateExpense', {expenseId: expense.id});
    } else {
      console.error('Invalid expense object', error);
    }
   
   };

  return (
    <View>
      {expenseList?.length > 0 && (
        <View>
          {expenseList.map((expense, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.container}
            >
              <View style={styles.iconContainer}>
                {expense.categoryIcon && (
                  <Text style={[styles.iconText, { backgroundColor: expense?.categoryColor }]}>
                    {expense.categoryIcon}
                  </Text>
                )}
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.categoryText}>{expense.categoryName}</Text>
                <Text style={styles.amountText}>Amount: {expense.amount}</Text>
                <Text style={styles.dateText}>Date: {new Date(expense.date).toDateString()}</Text>
              </View>
              <View style={styles.cardEdit}>
                <TouchableOpacity onPress={() => handleEdit(expense)}>
                  <FontAwesome6 name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(expense.id)}>
                  <MaterialIcons name="delete-outline" size={24} color="black" />
              </TouchableOpacity> 
              </View>
            </TouchableOpacity>
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
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '97%',
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 15,
    height: 80,
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
    flex: 1,
    marginLeft: 10,
  },
  categoryText: {
    fontSize: 18,
  },
  amountText: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  dateText: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  cardEdit: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
});

export default ExpenseList;
