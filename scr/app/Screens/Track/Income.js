// IncomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Source } from './Source';

import { getIncome, deleteIncome, getTotalIncome } from '../../../../BackEnd/db/Tables/income'; // Import function to fetch incomes
import { Link, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import IncomeList from '../../components/IncomeList'


const categorizeIncome = (income) => {
  const now = new Date();
  const categories = {
    recent: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  };

  income.forEach(item => {
    const incomeDate = new Date(item.date);
    const diffInDays = Math.floor((now - incomeDate) / (1000 * 60 * 60 * 24));

    if (diffInDays <= 1) {
      categories.recent.push(item);
    } else if (diffInDays <= 7) {
      categories.lastWeek.push(item);
    } else if (diffInDays <= 30) {
      categories.lastMonth.push(item);
    } else {
      categories.older.push(item);
    }
  });
  return categories;
};

export const Income = () => {

  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  //const [incomeList, setIncomeList] = useState([]);

  const fetchIncome = async () => {
    try {
      const data = await getIncome();
      if (Array.isArray(data)) {
        setIncome(data);
        calculateTotalIncome(data);
        calculateMonthlyIncome(data);
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

  const calculateMonthlyIncome = (data) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const total = data
      .filter(income => {
        const incomeDate = new Date(income.date);
        return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear;
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

  const categorizedIncome = categorizeIncome(income);

  return (
    <View style={styles.container}>
      <View style={{
        padding: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 20,
      }}>

        <View>
          <Text style={styles.titleText}>
            Total Income
          </Text>

          <Text style={styles.amountText}>
            Rs. {totalIncome.toFixed(2)}
          </Text>
        </View>

        <View>
          <Text style={styles.titleText}>
            Monthly Income
          </Text>

          <Text style={styles.amountText}>
            Rs. {monthlyIncome.toFixed(2)}
          </Text>
        </View>

      </View>
      <View style={styles.bottomContainer}>

        <ScrollView contentContainerStyle={styles.ScrollViewContent}>
          <Text style={styles.sectionHeader}>Recent</Text>
          <IncomeList incomeList={categorizedIncome.recent} handleDelete={handleDelete} />

          <Text style={styles.sectionHeader}>Last Week</Text>
          <IncomeList incomeList={categorizedIncome.lastWeek} handleDelete={handleDelete} />

          <Text style={styles.sectionHeader}>Last Month</Text>
          <IncomeList incomeList={categorizedIncome.lastMonth} handleDelete={handleDelete} />

          <Text style={styles.sectionHeader}>Older</Text>
          <IncomeList incomeList={categorizedIncome.older} handleDelete={handleDelete} />

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

//export default Income;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82E80B',
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
  },
  bottomContainer: {
    height: 1000,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  addBtn: {
    position: 'absolute',
    top: 350,
    right: 5,
    //marginRight:10,

  }
  /* header: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     paddingVertical: 30,
   },
 
   floatingButton: {
     position: 'absolute',
     width: 100,
     height: 100,
     left: 295,
     top: 530,
   }*/
});

export default Income;