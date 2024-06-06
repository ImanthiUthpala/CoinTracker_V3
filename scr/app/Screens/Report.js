import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getIncome } from '../../../BackEnd/db/Tables/income';
import { getExpense } from '../../../BackEnd/db/Tables/expense';
import { getSources } from '../../../BackEnd/db/Tables/sources';
import { getCategory } from '../../../BackEnd/db/Tables/categories';
import Colors from '../../../assets/Colors';

const screenWidth = Dimensions.get('window').width;

const generateChartData = (data, key) => {
  const groupedData = data.reduce((acc, item) => {
    const keyValue = item[key];
    if (!acc[keyValue]) {
      acc[keyValue] = 0;
    }
    acc[keyValue] += item.amount;
    return acc;
  }, {});

  return {
    labels: Object.keys(groupedData),
    datasets: [
      {
        data: Object.values(groupedData),
      },
    ],
  };
};

export const Report = () => {
  const [reportType, setReportType] = useState('income');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedSourceOrCategory, setSelectedSourceOrCategory] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });

  const fetchIncomeData = async () => {
    try {
      const data = await getIncome();
      return data.filter(
        (item) => new Date(item.date) >= startDate && new Date(item.date) <= endDate
      );
    } catch (error) {
      console.error('Error fetching income: ', error);
      return [];
    }
  };

  const fetchExpenseData = async () => {
    try {
      const data = await getExpense();
      return data.filter(
        (item) => new Date(item.date) >= startDate && new Date(item.date) <= endDate
      );
    } catch (error) {
      console.error('Error fetching expenses: ', error);
      return [];
    }
  };

  const fetchSourcesAndCategories = async () => {
    try {
      const sourcesData = await getSources();
      setSources(sourcesData);
      const categoriesData = await getCategory();
      console.log('Categories Data:', categoriesData);

      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching sources or categories: ', error);
    }
  };

  const generateReport = async () => {
    let data = [];
    if (reportType === 'income') {
      data = await fetchIncomeData();
    } else {
      data = await fetchExpenseData();
    }

    if (!data) {
      console.error('Data is undefined');
      return;
    }

    let filteredData = data;

    if (selectedSourceOrCategory !== '') {
      filteredData = data.filter(
        (item) =>
          (reportType === 'income' ? item.sourceName : item.categoryName) === selectedSourceOrCategory
      );
    }

    console.log('Filtered Data:', filteredData);

    if (!filteredData || !Array.isArray(filteredData)) {
      console.error('Filtered Data is not an array');
      return;
    }

    setChartData(
      generateChartData(filteredData, reportType === 'income' ? 'sourceName' : 'categoryName')
    );
  };

  useEffect(() => {
    fetchSourcesAndCategories();
    generateReport();
  }, [reportType, startDate, endDate, selectedSourceOrCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.detailContainer}>
          <View>
          <Text style={styles.header}>Generate Report</Text>
          </View>
       
        </View>
        
      </View>
      
      <ScrollView>
      <View style={styles.outer}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Report Type:</Text>
        <Picker
          selectedValue={reportType}
          onValueChange={(itemValue) => setReportType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Income" value="income" />
          <Picker.Item label="Expense" value="expense" />
        </Picker>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.label}>Start Date:</Text>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
          <Text>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowStartDatePicker(false);
              if (date) {
                setStartDate(date);
              }
            }}
          />
        )}
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.label}>End Date:</Text>
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}>
          <Text>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            minimumDate={startDate}
            onChange={(event, date) => {
              setShowEndDatePicker(false);
              if (date) {
                setEndDate(date);
              }
            }}
          />
        )}
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>
          {reportType === 'income' ? 'Source:' : 'Category:'}
        </Text>
        <Picker
          selectedValue={selectedSourceOrCategory}
          onValueChange={(itemValue) => setSelectedSourceOrCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="" />
          {(reportType === 'income' ? sources : categories)?.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      <View>
        <BarChart
          data={chartData}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: Colors.BLUE,
            backgroundGradientFrom: Colors.GRAY,
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 15,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
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
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'justify',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#82E80B',
    alignContent: 'center'
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    textAlign: 'center',
    //backgroundColor: '#fff',
  },
  outer : {
    backgroundColor: '#fff',
    padding: 15
  },
  pickerContainer: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dateContainer: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: Colors.GREEN,
  },
});
