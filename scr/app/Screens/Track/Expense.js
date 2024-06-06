import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getExpense, deleteExpense } from '../../../../BackEnd/db/Tables/expense';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import ExpenseList from '../../components/ExpenseList';


const categorizeExpense = (expense) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  //Calculate start of this week
  const startOfThisWeek = new Date(startOfToday);
  const dayOfWeek = startOfToday.getDay();
  const startOfLastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);


  //Calculate start of this month
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const categories = {
    recent: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  };

  expense.forEach(item => {
    const expenseDate = new Date(item.date);
  
    if (expenseDate >= startOfToday) {
      categories.recent.push(item);
    } else if (expenseDate >= startOfLastWeek) {
      categories.lastWeek.push(item);
    } else if (expenseDate >= startOfThisMonth) {
      categories.lastMonth.push(item);
    } else {
      categories.older.push(item);
    }
  });

  return categories;
};

const getMonthName = (monthIndex) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[monthIndex];
}
export const Expense = () => {

  const [expense, setExpense] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchExpense = async () => {
    try {
      const data = await getExpense();
      if (Array.isArray(data)) {
        setExpense(data);
        calculateTotalExpense(data);
        calculateMonthlyExpense(data, selectedMonth, selectedYear);
      } else {
        console.error('Data received from getExpense is not an array:', data);
      }

    } catch (error) {
      console.error('Error fetching expense: ', error);
    }
  };

  const calculateTotalExpense = (data) => {
    const total = data.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpense(total);
  };

  const calculateMonthlyExpense = (data, month, year) => {
   
    const total = data
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    setMonthlyExpense(total);
  }

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', onPress: async () => {
            try {
              await deleteExpense(id);
              fetchExpense(); // Refresh the list after deletion
            } catch (error) {
              console.error('Error deleting expense: ', error);
            }
          }
        },
      ]
    );
  };

  const handlePress = () => {
    navigation.navigate('Category');
  };

  useEffect(() => {
    if (isFocused) {
      fetchExpense();
    }
  }, [isFocused]);

  useEffect(() => {
    if (expense.length > 0) {
      calculateMonthlyExpense(expense, selectedMonth, selectedYear);
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

  const categorizedExpense = categorizeExpense(expense);

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

        <View style={styles.expenseContainer}>
          {/* <View>
            <Text style={styles.titleText}>
              Total Expense
            </Text>

            <Text style={styles.amountText}>
              Rs. {totalExpense.toFixed(2)}
            </Text>
          </View> */}

          <View>
            <Text style={styles.titleText}>
              Monthly Expense
            </Text>

            <Text style={styles.amountText}>
              Rs. {monthlyExpense.toFixed(2)}
            </Text>
          </View>
        </View>

      </View>
      <View style={styles.bottomContainer}>

        <ScrollView contentContainerStyle={styles.ScrollViewContent}>
          <Text style={styles.sectionHeader}>Recent</Text>
          <ExpenseList expenseList={categorizedExpense.recent} handleDelete={handleDelete} />

          <Text style={styles.sectionHeader}>Last Week</Text>
          <ExpenseList expenseList={categorizedExpense.lastWeek} handleDelete={handleDelete} />

          <Text style={styles.sectionHeader}>This Month</Text>
          <ExpenseList expenseList={categorizedExpense.lastMonth} handleDelete={handleDelete} />

          <Text style={styles.sectionHeader}>Previous Months</Text>
          <ExpenseList expenseList={categorizedExpense.older} handleDelete={handleDelete} />

          <View style={{ height: 80 }} />
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
    padding: 10,
    backgroundColor: '#82E80B',
    height: 80,
  },
  expenseContainer: {
    flexDirection: 'column',
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
    //height: 1000,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  addBtn: {
    position: 'absolute',
    top: 400,
    right: 5,
    //marginRight:10,
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

export default Expense;