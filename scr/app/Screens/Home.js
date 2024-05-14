import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import Income_listItem from '../components/Income_listItem';

export const Home = () => {
  return (
    <View style={styles.container}>
      <View style={{
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View>
          <Text style={
            styles.titleText}>
            Income
          </Text>

          <Text style={styles.amountText}>
            Rs. 0.00
          </Text>
        </View>

        <View>
          <Text style={
            styles.titleText}>
            Expense
          </Text>

          <Text style={styles.amountText}>
            Rs. 0.00
          </Text>
        </View>


      </View>
      <View style={styles.bottomContainer}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82E80B',
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  amountText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
  },
  bottomContainer: {
    height: 1000,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
})

