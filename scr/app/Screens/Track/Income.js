import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getIncome, deleteIncome } from '../../../../BackEnd/db/Tables/income';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import IncomeList from '../../components/IncomeList';




const categorizeIncome = (income) => {
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

  income.forEach(item => {
    const incomeDate = new Date(item.date);
  
    if (incomeDate >= startOfToday) {
      categories.recent.push(item);
    } else if (incomeDate >= startOfLastWeek) {
      categories.lastWeek.push(item);
    } else if (incomeDate >= startOfThisMonth) {
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
export const Income = () => {

  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchIncome = async () => {
    try {
      const data = await getIncome();
      if (Array.isArray(data)) {
        setIncome(data);
        calculateTotalIncome(data);
        calculateMonthlyIncome(data, selectedMonth, selectedYear);
      } else {
        console.error('Data received from getIncome is not an array:', data);
      }

    } catch (error) {
      console.error('Error fetching income: ', error);
    }
  };

  const calculateTotalIncome = (data) => {
    const total = data.reduce((sum, income) => sum + income.amount, 0);
    setTotalIncome(total);
  };

   const calculateMonthlyIncome = (data, month, year) => {
   
    const total = data
      .filter(income => {
        const incomeDate = new Date(income.date);
        return incomeDate.getMonth() === month && incomeDate.getFullYear() === year;
      })
      .reduce((sum, income) => sum + income.amount, 0);

    setMonthlyIncome(total);
  }

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this income?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', onPress: async () => {
            try {
              await deleteIncome(id);
              fetchIncome(); // Refresh the list after deletion
            } catch (error) {
              console.error('Error deleting income: ', error);
            }
          }
        },
      ]
    );
  };

  const handlePress = () => {
    navigation.navigate('Source');
  };

  useEffect(() => {
    if (isFocused) {
      fetchIncome();
    }
  }, [isFocused]);

  useEffect(() => {
    if (income.length > 0) {
      calculateMonthlyIncome(income, selectedMonth, selectedYear);
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

  const categorizedIncome = categorizeIncome(income);

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

        <View style={styles.incomeContainer}>
          {/* <View>
            <Text style={styles.titleText}>
              Total Income
            </Text>

            <Text style={styles.amountText}>
              Rs. {totalIncome.toFixed(2)}
            </Text>
          </View> */}

          <View>
            <Text style={styles.titleText}>
              Monthly Income
            </Text>

            <Text style={styles.amountText}>
              Rs. {monthlyIncome.toFixed(2)}
            </Text>
          </View>
        </View>

      </View>
      <View style={styles.bottomContainer}>

        <ScrollView contentContainerStyle={styles.ScrollViewContent}>
          <Text style={styles.sectionHeader}>Recent</Text>
          <IncomeList incomeList={categorizedIncome.recent} handleDelete={handleDelete} />

          <Text style={styles.sectionHeader}>Last Week</Text>
          <IncomeList incomeList={categorizedIncome.lastWeek} handleDelete={handleDelete} />

          <Text style={styles.sectionHeader}>This Month</Text>
          <IncomeList incomeList={categorizedIncome.lastMonth} handleDelete={handleDelete} />

          <Text style={styles.sectionHeader}>Previous Months</Text>
          <IncomeList incomeList={categorizedIncome.older} handleDelete={handleDelete} />

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
    padding: 20,
    backgroundColor: '#82E80B',
  },
  incomeContainer: {
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
    top: 330,
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

export default Income;