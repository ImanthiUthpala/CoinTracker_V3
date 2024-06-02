import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../../assets/Colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getBudget } from '../../../BackEnd/db/Tables/budget';
import { ProgressBar } from 'react-native-paper';


//console.log('BudgetList component loaded');

const BudgetList = ({ budgetList = [], expenses, handleDelete}) => {


  const navigation = useNavigation();
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    async function fetchBudgetData() {
      try {
        const data = await getBudget();
        setBudgetData(data);
      } catch (error) {
        console.error('Error fetching budgets:' , error);
      }
    }
    fetchBudgetData();
  }, []);

  // useEffect(() => {
  //   //Recalculate spent amount when budgetaList or expense change

  //   if (budgetList.length > 0 && expenses.length > 0) {
  //     const updatedBudgetList = budgetList.map(budget => {
  //       const spentAmount = calculateSpentAmount(budget, expenses);
  //       return { ...budget, spentAmount};
  //     });
  //     setBudgetData(updatedBudgetList);
  //   }
  // }, [budgetList, expenses]);

  const calculateSpentAmount = (budget) => {
    return expenses
      .filter(
        (expense) =>
          expense.category_id === budget.category_id &&
          new Date(expense.date) >= new Date(budget.start_date) &&
          new Date(expense.date) <= new Date(budget.end_date)
      )
      .reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  if (!budgetList || budgetList.length === 0) {
    return <Text> No budget data available oooooo</Text>
  }

  const handleEdit = (budget) => {
    if (budget && budget.id) {
      navigation.navigate('UpdateBudget', {budgetId: budget.id});
    } else {
      console.error('Invalid budget object');
    }
  };

  return(
    <View>
      {budgetList?.length > 0 && (
        <View>
          {budgetList.map((budget, index) => {
           
           const spentAmount = calculateSpentAmount(budget);
           const remainingAmount = budget.cash_limit - budget.spentAmount;
           const isExceeded = remainingAmount < 0;
           const progress = budget.spentAmount / budget.cash_limit;

            return (
              <TouchableOpacity
              key={index}
              style={styles.container}>
                <View style={styles.iconContainer}>
                  {budget.categoryIcon && (
                    <Text style={[styles.iconText, {backgroundColor: budget?.categoryColor}]}>
                      {budget.categoryIcon}
                    </Text>
                  )}
                </View>
                 <View style={styles.detailsContainer}>
                  <Text style={styles.categoryText}>{budget.categoryName}</Text>
                  <Text style={styles.amountText}>Budget: Rs.{budget.cash_limit.toFixed(2)}</Text>
                  <Text style={styles.spentAmount}>Spent: Rs.
                  {spentAmount.toFixed(2)}</Text>
                  <Text style={[styles.remainingAmount, isExceeded && styles.exceededAmount]}>
                    {isExceeded ? 'Exceeded by: ' : 'Remaining: '}Rs. {Math.abs(remainingAmount).toFixed(2)}
                  </Text>
                  <Text style={styles.dateText}>
                    Period: {new Date(budget.start_date).toDateString()} - {new Date(budget.end_date).toDateString()}
                  </Text>
                    <View style={styles.progressBarContainer}>
                    <ProgressBar progress={progress} color={isExceeded ? Colors.RED : Colors.GREEN} style={styles.progressBar} />
                  </View>  
                </View> 
                <View style={styles.cardEdit}>
                  <TouchableOpacity onPress={() => handleEdit(budget)}>
                  <FontAwesome6 name="edit" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(budget.id)}>
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
    padding: 10,
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
    flex: 1,
    marginLeft: 10,
    height:150,
  },
  categoryText: {
    fontSize: 18,
  },
  amountText: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  spentAmount: {
    fontSize: 16,
    color: 'blue',
  },
  remainingAmount: {
    fontSize: 16,
    color: 'green',
  },
  exceededAmount: {
    color: 'red',
  },
  progressBarContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  cardEdit: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
});

export default BudgetList;