import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function IncomeListItem(){
  return(
    <View style={styles.container}>
      <Text style={styles.name}>Salary</Text>
      <Text style={styles.amount}>100,000</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,

  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    

  },
  amount: {},
})