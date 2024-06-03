import React, { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Alert,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBudget, deleteBudget } from '../../../../BackEnd/db/Tables/budget';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import BudgetList from '../../components/BudgetList';
import { ProgressBar } from 'react-native-paper';
import { getExpense } from '../../../../BackEnd/db/Tables/expense';

// Helper function to get month name
const getMonthName = (monthIndex) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[monthIndex];
}

export const Budget = () => {

  const [budget, setBudget] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState(0);

  const [weeklyBudgets, setWeeklyBudgets] = useState([]);
  const [monthlyBudgets, setMonthlyBudgets] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchBudget = async () => {
    try {
      const data = await getBudget();
      const expenseData = await getExpense();
      console.log('Fetched Budget data: ', data)
      console.log('Fetched Expense data: ', expenseData);

      if (Array.isArray(data)) {
        setBudget(data);
        categorizeBudgets(data, selectedMonth, selectedYear);
        // calculateTotalBudget(data);
        // calculateMonthlyBudget(data, selectedMonth, selectedYear);
      } else {
        console.error('Data received from getBudget is not an array: ', data);
        setBudget([]);
      }

      if (Array.isArray(expenseData)) {
        setExpenses(expenseData);
      } else {
        console.error('Error fetching budgets and expenses: ', error);
       // setBudget([]);
        setExpenses([]);
      }
    } catch (error){
      console.error('Error fetching budgets: ', error);
      setBudget([]);
    }
  };

  const categorizeBudgets = (data, month, year) => {
    const weekly = [];
    const monthly = [];
    let monthlyTotal = 0;

    data.forEach(budget => {
      const budgetStartDate = new Date(budget.start_date);
      const budgetEndDate = new Date(budget.end_date);

      const isCurrentMonth = (date) => date.getMonth() === month && date.getFullYear() === year;

      const budgetSpansCurrentMonth = 
      (budgetStartDate.getFullYear() < year || (budgetStartDate.getFullYear() === year && budgetStartDate.getMonth() <= month)) &&
      (budgetEndDate.getFullYear() > year || (budgetEndDate.getFullYear() === year && budgetEndDate.getMonth() >= month));

      if (budgetSpansCurrentMonth) {
        const overlapStartDate = budgetStartDate.getMonth() === month && budgetStartDate.getFullYear() === year
        ? budgetStartDate
        : new Date(year, month, 1);

      const overlapEndDate = budgetEndDate.getMonth() === month && budgetEndDate.getFullYear() === year
      ? budgetEndDate
      : new Date(year, month + 1, 0);

      const duration = Math.ceil((overlapEndDate - overlapStartDate) / (1000 * 60 * 60 * 24)) + 1;
      
      monthlyTotal += (parseFloat(budget.cash_limit) / Math.ceil((budgetEndDate - budgetStartDate) / (1000 * 60 * 60 * 24))) * duration;

      if (duration > 7) {
        monthly.push(budget);
      } else {
        weekly.push(budget);
      }
      }
    });

    setWeeklyBudgets(weekly);
    setMonthlyBudgets(monthly);
    setMonthlyBudget(monthlyTotal);
  };

  // const calculateTotalBudget = (data) => {
  //   const total = data.reduce((sum, budget) => sum + parseFloat(budget.cash_limit), 0);
  //   setTotalBudget(total);
  // };

  // const calculateMonthlyBudget = (data, month, year) => {
  //   const total = data
  //   .filter(budget => {
  //     const budgetStartDate = new Date(budget.start_date);
  //     const budgetEndDate = new Date(budget.end_date);
  //     return (budgetStartDate.getMonth() === month && budgetStartDate.getFullYear() === year) ||
  //     (budgetEndDate.getMonth() === month && budgetEndDate.getFullYear() === year);
  //   })
  //   .reduce((sum, budget) => sum + parseFloat(budget.cash_limit), 0);

  //   setMonthlyBudget(total);
  // }

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this budget?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', onPress: async () => {
            try {
              await deleteBudget(id);
              fetchBudget(); // Refresh the list after deletion
            } catch (error) {
              console.error('Error deleting budget: ', error);
            }
          }
        },
      ]
    );
  };

  const handlePress = () => {
    navigation.navigate('BudgetCategory');
  };

  useEffect(() => {
    if (isFocused) {
      fetchBudget();
    }
  }, [isFocused]);

  useEffect(() => {
    if (budget.length > 0) {
      categorizeBudgets(budget, selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);

  const changeMonth = (direction) => {
    let newMonth = selectedMonth + direction;
    let newYear = selectedYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  }
/*
  const categorizedBudget = categorizeBudget(budget, selectedMonth, selectedYear);
*/

  const renderMonthSlider = () => {
    return(
      <View style={styles.monthSlider}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {getMonthName(selectedMonth)} {selectedYear}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.summeryContainer}>
        {renderMonthSlider()}

        {/* <View style={styles.budgetContainer}>
          <View>
            <Text style={styles.titleText}>
              Total Budgets
            </Text>

            <Text style={styles.amountText}>
              Rs. {totalBudget.toFixed(2)}
            </Text>
          </View>
          
          <View>
          <Text style={styles.titleText}>
              Monthly Budgets
            </Text>
            <Text style={styles.amountText}>
              Rs. {monthlyBudget.toFixed(2)}
            </Text>
          </View>
          
          
        </View> */}

      </View>
      
      <View style={styles.bottomContainer}>

      <ScrollView contentContainerStyle={styles.ScrollViewContent}>
        <Text style={styles.sectionHeader}>Weekly Budgets</Text>
        {weeklyBudgets.length > 0 ? (
          <BudgetList budgetList={weeklyBudgets} expenses={expenses} handleDelete={handleDelete} />
        ) : (
          <Text style={styles.noBudgetText}>No monthly budgets available</Text>
        )}

        <Text style={styles.sectionHeader}>Monthly Budgets</Text>
        {monthlyBudgets.length > 0 ? (
          <BudgetList budgetList={monthlyBudgets} expenses={expenses} handleDelete={handleDelete} />
        ) : (
          <Text style={styles.noBudgetText}>No monthly budgets available</Text>
        )
        }

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
    //padding: 20,
    backgroundColor: '#82E80B',
  },
  summeryContainer: {
    padding: 20,
    backgroundColor: '#82E80B',
    //marginBottom: 20,
  },
  expenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  amountText: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center'
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    color: '#000',
  },
  ScrollViewContent: {
    padding: 10,
    paddingBottom: 100,
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  addBtn: {
    position: 'absolute',
    top: 330,
    right: 5,
  },
  monthSlider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  budgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   // backgroundColor: '#FFF',
    //padding: 15,
   // borderRadius: 10,
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
   // shadowOpacity: 0.1,
    //shadowRadius: 8,
    //elevation: 4,
  },
});

//export default Budget;