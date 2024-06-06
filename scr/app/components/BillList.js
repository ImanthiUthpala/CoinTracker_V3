import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../assets/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';

const BillList = ({ billList = [], handleDelete, handleMarkAsPaid, isPaid = false }) => {

  const navigation = useNavigation();

  const handleEdit = (id) => {
    navigation.navigate('UpdateBill', { billId: id });
  };

  return (
    <View style={styles.container}>
      {billList?.length > 0 ? (
        billList.map((bill, index) => (
          <View key={index} style={styles.billContainer}>
            <View style={styles.iconContainer}>
              <Text style={[styles.iconText, { backgroundColor: bill.color }]}>{bill.icon}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.billText}>{bill.name}</Text>
              <Text style={styles.amountText}>Amount: {bill.amount}</Text>
              <Text style={styles.dateText}>Due Date: {new Date(bill.due_date).toDateString()}</Text>
              <Text style={styles.dateText}>Reminder Date: {new Date(bill.reminder_date).toDateString()}</Text>
            
            
              {!isPaid && (
                <TouchableOpacity onPress={() => handleMarkAsPaid(bill.id)}>
                  <Text style={styles.paidButton}>Mark as Paid</Text>
                </TouchableOpacity>
              )}
              </View>
              <View style={styles.actionContainer}>
                {!isPaid && (
                  <TouchableOpacity onPress={() => handleEdit(bill.id)}>
                    <MaterialIcons name="edit" size={24} color="black" />
                  </TouchableOpacity>
                )}
              <TouchableOpacity onPress={() => handleDelete(bill.id)}>
                <MaterialIcons name="delete-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noBillText}>No bills available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  billContainer: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    textAlign: 'center',
    fontSize: 30,
    padding: 10,
    borderRadius: 100,
    color: Colors.WHITE,
  },
  detailsContainer: {
    flex: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  billText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  paidButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: Colors.GREEN,
    marginTop: 8,
    borderRadius: 8,
    marginRight: 10,
    width: 100,
  },
  noBillText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
  },
});

export default BillList;
