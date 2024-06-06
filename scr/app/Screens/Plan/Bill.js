import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import Colors from '../../../../assets/Colors';
import BillList from '../../components/BillList';
import { getBill, deleteBill, updateBillPaidStatus } from '../../../../BackEnd/db/Tables/bill';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const getMonthName = (monthIndex) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[monthIndex];
};

const Bill = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [bills, setBills] = useState([]);
  const [paidBills, setPaidBills] = useState([]);
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchBill = async () => {
    try {
      const data = await getBill();
      console.log('Fetched Bill data: ', data);

      if (Array.isArray(data)) {
        setBills(data);
        categorizeBills(data, selectedMonth, selectedYear);
      } else {
        console.error('Data received from getBill is not an array: ', data);
        setBills([]);
      }
    } catch (error) {
      console.error('Error fetching bills: ', error);
      setBills([]);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchBill();
    }
  }, [isFocused]);

  useEffect(() => {
    if (bills.length > 0) {
      categorizeBills(bills, selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);

  const categorizeBills = (data, month, year) => {
    const unpaid = [];
    const paid = [];

    data.forEach(bill => {
      const dueDate = new Date(bill.due_date);
      const isPaid = bill.paid === "true" || bill.paid === 1 || bill.paid === true;

      if (dueDate.getMonth() === month && dueDate.getFullYear() === year) {
        if (isPaid) {
          paid.push(bill);
        } else {
          unpaid.push(bill);
        }
      }
    });

    setUnpaidBills(unpaid);
    setPaidBills(paid);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this bill?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', onPress: async () => {
            try {
              await deleteBill(id);
              fetchBill();
            } catch (error) {
              console.error('Error deleting bill: ', error);
            }
          }
        },
      ]
    );
  };

 

  const handleMarkAsPaid = async (id) => {
    Alert.alert(
      "Mark as Paid",
      "Are you sure you want to mark this bill as paid?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await updateBillPaidStatus(id, true);
              fetchBill();
            } catch (error) {
              console.error('Error marking bill as paid: ', error);
            }
          }
        }
      ]
    );
  };

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
  };

  const renderMonthSlider = () => (
    <View style={styles.monthSlider}>
      <TouchableOpacity onPress={() => changeMonth(-1)}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.monthText}>{getMonthName(selectedMonth)} {selectedYear}</Text>
      <TouchableOpacity onPress={() => changeMonth(1)}>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        {renderMonthSlider()}
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.sectionHeader}>Bill Reminders</Text>
          <BillList billList={unpaidBills} handleDelete={handleDelete} handleMarkAsPaid={handleMarkAsPaid} />
          <Text style={styles.sectionHeader}>Paid Bills</Text>
          <BillList billList={paidBills} handleDelete={handleDelete} isPaid />
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddBill')}>
          <FontAwesome6 name="plus" size={24} color="white" />
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
  summaryContainer: {
    padding: 20,
    backgroundColor: '#82E80B',
    height: 80,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    color: '#000',
  },
  scrollViewContent: {
    padding: 10,
    paddingBottom: 100,
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#82E80B',
    padding: 15,
    borderRadius: 100,
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
});

export default Bill;
