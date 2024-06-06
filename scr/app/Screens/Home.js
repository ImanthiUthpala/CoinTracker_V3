import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getIncome } from '../../../BackEnd/db/Tables/income';
import { getExpense } from '../../../BackEnd/db/Tables/expense';
import { getBill, updateBillPaidStatus, deleteBill } from '../../../BackEnd/db/Tables/bill';
import BillList from '../components/BillList';
import { useFocusEffect } from '@react-navigation/native';

export const Home = () => {

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [upcomingBills, setUpcomingBills] = useState([]);;

  // Function to calculate monthly income
  const calculateMonthlyIncome = async () => {
    const incomeData = await getIncome();
    const monthlyIncome = incomeData.reduce((total, income) => {
      const incomeDate = new Date(income.date);
      if (incomeDate.getMonth() + 1 === selectedMonth) {
        return total + parseFloat(income.amount);
      }
      return total;
    }, 0);
    return monthlyIncome;
  };

  // Function to calculate monthly expense
  const calculateMonthlyExpense = async () => {
    const expenseData = await getExpense();
    const monthlyExpense = expenseData.reduce((total, expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate.getMonth() + 1 === selectedMonth) {
        return total + parseFloat(expense.amount);
      }
      return total;
    }, 0);
    return monthlyExpense;
  };

  // Function to calculate balance
  const calculateBalance = async () => {
    const income = await calculateMonthlyIncome();
    const expense = await calculateMonthlyExpense();
    const balance = income - expense;
    return balance;
  };

  const fetchUpcomingBills = async () => {
    const billData = await getBill();
    const today = new Date();
    const upcomingBills = billData.filter(bill => !bill.paid && new Date(bill.due_date) >= today);
    setUpcomingBills(upcomingBills);
  };

  
    const updateValues = async () => {
      const income = await calculateMonthlyIncome();
      const expense = await calculateMonthlyExpense();
      const balance = income - expense;

      setMonthlyIncome(income);
      setMonthlyExpense(expense);
      setBalance(balance);

      fetchUpcomingBills();
    };

   useEffect(() => {
    updateValues();
  }, [selectedMonth, selectedYear]);

  useFocusEffect(
    useCallback(() => {
      updateValues();
    }, [])
   
 );

  const getMonthName = (monthIndex) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex];
  }

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

  const handleDeleteBill = async (id) => {
    await deleteBill(id);
    fetchUpcomingBills();
  };

  const handleMarkAsPaid = async (id) => {
    await updateBillPaidStatus(id, true);
    fetchUpcomingBills();
  };


  const renderMonthSlider = () => {
    return (
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

        <View style={styles.detailContainer}>
          <View >
            <Text style={
              styles.titleText}>
              Income
            </Text>

            <Text style={styles.amountText}>
              Rs. {monthlyIncome.toFixed(2)}
            </Text>
          </View>
          <View>
            <Text style={
              styles.titleText}>
              Expense
            </Text>

            <Text style={styles.amountText}>
              Rs. {monthlyExpense.toFixed(2)}
            </Text>
          </View>

          <View>
            <Text style={
              styles.titleText}>
              Balance
            </Text>

            <Text style={[styles.amountText, balance >= 0 ? styles.positiveBalance : styles.negativeBalance]}>
              Rs. {balance.toFixed(2)}
            </Text>
          </View>

        </View>
      </View>

      <ScrollView style={styles.bottomContainer}>
        <Text style={styles.billText}>Upcoming Bills</Text>
       
        <View style={styles.billListContainer}>
          <BillList
            billList={upcomingBills}
            handleDelete={handleDeleteBill}
            handleMarkAsPaid={handleMarkAsPaid}
          />
        </View>

        
      </ScrollView>
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
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  billText: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
  },
  amountText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  positiveBalance: {
    color: 'green',
  },
  negativeBalance: {
    color: 'red',
  },
  bottomContainer: {
    height: 1000,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },
  billListContainer: {
    paddingTop: 10,  // Ensure padding between title and list
  },
})