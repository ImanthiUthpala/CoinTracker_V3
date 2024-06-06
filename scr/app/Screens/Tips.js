import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../../assets/Colors';

const TipsCard = ({ tipNumber, tipText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tipNumberContainer}>
        <Text style={styles.tipNumber}>Tip #{tipNumber}</Text>
      </View>
      <Text style={styles.tipText}>{tipText}</Text>
    </View>
  );
};

export const Tips = () => {
  return (
    <View style={styles.outerContainer}>
      <ScrollView>
      <TipsCard
        tipNumber={1}
        tipText="Pay yourself first by saving a portion of your income before spending on other expenses."
      />
      <TipsCard
        tipNumber={2}
        tipText="Create and stick to a budget to track your income and expenses and manage your finances better."
      />
      <TipsCard
        tipNumber={3}
        tipText="Avoid high-interest debt like credit card debt by paying off your balances in full each month."
      />
      <TipsCard
        tipNumber={4}
        tipText="Invest in your financial education by reading books or taking courses on personal finance."
      />
      <TipsCard
        tipNumber={5}
        tipText="Automate your savings by setting up automatic transfers to your savings account each month."
      />
      <TipsCard
        tipNumber={6}
        tipText="Regularly review your expenses to identify areas where you can cut back and save more money."
      />
      </ScrollView>
     
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    padding: 10,
  },
  container: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  tipNumberContainer: {
    backgroundColor: Colors.GREEN,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  tipNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  tipText: {
    fontSize: 16,
    color: '#666666',
  },
});

//export default Tips;
