import React, { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Alert,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBudget, deleteBudget } from '../../../../BackEnd/db/Tables/budget';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import BudgetList from '../../components/BudgetList';

// Helper function to get month name
const getMonthName = (monthIndex) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[monthIndex];
}

export const Budget = () => {

  const [budget, setBudget] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchBudget = async () => {
    try {
      const data = await getBudget();
      console.log('Fetched Budget data: ', data)
      if (Array.isArray(data)) {
        setBudget(data);
        calculateTotalBudget(data);
        calculateMonthlyBudget(data, selectedMonth, selectedYear);
      } else {
        console.error('Data received from getBudget is not an array: ', data);
        setBudget([]);
      }
    } catch (error){
      console.error('Error fetching budgets: ', error);
      setBudget([]);
    }
  };

  const calculateTotalBudget = (data) => {
    const total = data.reduce((sum, budget) => sum + parseFloat(budget.cash_limit), 0);
    setTotalBudget(total);
  };

  const calculateMonthlyBudget = (data, month, year) => {
    const total = data
    .filter(budget => {
      const budgetStartDate = new Date(budget.start_date);
      const budgetEndDate = new Date(budget.end_date);
      return (budgetStartDate.getMonth() === month && budgetStartDate.getFullYear() === year) ||
      (budgetEndDate.getMonth() === month && budgetEndDate.getFullYear() === year);
    })
    .reduce((sum, budget) => sum + parseFloat(budget.cash_limit), 0);

    setMonthlyBudget(total);
  }

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
      calculateMonthlyBudget(budget, selectedMonth, selectedYear);
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
    )
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.summeryContainer}>
        {renderMonthSlider()}

        <View style={styles.budgetContainer}>
          <View>
            <Text style={styles.titleText}>
              Total Budgets
            </Text>

            <Text style={styles.amountText}>
              Rs. {totalBudget.toFixed(2)}
            </Text>
          </View>

          <View>
            <Text style={styles.amountText}>
              Rs. {monthlyBudget.toFixed(2)}
            </Text>
          </View>
        </View>

      </View>
      
      <View style={styles.bottomContainer}>

      <ScrollView contentContainerStyle={styles.ScrollViewContent}>
        {budget.length > 0 ? (
          <BudgetList budgetList={budget} handleDelete={handleDelete} />
        ) : (
          <Text style={styles.noBudgetText}>No budgets available on screen</Text>
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
    backgroundColor: '#82E80B',
  },
  summeryContainer: {
    padding: 20,
    backgroundColor: '#82E80B',
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
  },
  monthText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

//export default Budget;