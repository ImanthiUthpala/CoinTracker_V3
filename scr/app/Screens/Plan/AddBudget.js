import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../../../assets/Colors';
import { insertBudget, updateBudget } from '../../../../BackEnd/db/Tables/budget';
import { getCategoryById } from '../../../../BackEnd/db/Tables/categories';


export const AddBudget = ({ route, navigation }) => {
  const { categoryId, categoryIcon } = route.params;
  const [amount, setAmount] = useState('');
  const [dateType, setDateType] = useState('week'); // week or month
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const category = await getCategoryById(categoryId);
        if (category && category.name){
          setCategoryName(category.name);
        } else {
          console.error('Category not found');
        }
        
      } catch (error) {
        console.error('Error fetching category name: ', error);
      }
    };
    fetchCategoryName();
  }, [categoryId]);

  useEffect(() => {
    if (dateType === 'week') {
      setEndDate(new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000));
    } else if (dateType === 'month') {
      const end = new Date(startDate);
      end.setMonth(end.getMonth() + 1);
      end.setDate(end.getDate() - 1);
      setEndDate(end);
    }
  }, [startDate, dateType]);

  const handleAddBudget = async () => {
    try {
      await insertBudget(startDate.toISOString(), endDate.toISOString(), amount, categoryId);
      console.log('Budget added successfully');
      navigation.goBack();
      //updateBudget();
      //Fetch updated budgets after adding a new budget
     // fetchBudgets();
      navigation.goBack();
    } catch (error) {
      console.error('Error adding budget: ', error);
    }
  };

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'android' ? 60 : 0} >


    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.categoryLabel}>Category: {categoryName || 'Unknown Category'}</Text>
      <Text style={styles.label}>Amount (Rs.)</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={amount}
        onChangeText={(value) => setAmount(value)}
      />

      <Text style={styles.label}>Monthly / Weekly</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.dateTypeButton, dateType === 'week' && styles.selectedButton]}
          onPress={() => setDateType('week')}
        >
          <Text style={[styles.buttonText, dateType === 'week' && styles.selectedButtonText]}>Week</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dateTypeButton, dateType === 'month' && styles.selectedButton]}
          onPress={() => setDateType('month')}
        >
          <Text style={[styles.buttonText, dateType === 'month' && styles.selectedButtonText]}>Month</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.input}>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode='date'
          display='default'
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) {
              setStartDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.input}>{endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode='date'
          display='default'
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) {
              setEndDate(selectedDate);
            }
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddBudget}>
        <Text style={styles.buttonText}>Add Budget</Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.WHITE,
    //marginBottom: 10
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50, // Added padding to avoid hiding behind the bottom tab navigator
  },
  categoryLabel: {
    fontSize: 20,
   // fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dateTypeButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.LIGHT_GRAY,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: Colors.GREEN,
  },
  button: {
    backgroundColor: Colors.GREEN,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.BLACK,
    fontSize: 18,
  },
  selectedButtonText: {
    color: Colors.WHITE,
  },
});
