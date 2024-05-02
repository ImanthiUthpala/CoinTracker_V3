import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function ExpenseListItem(){
  return(
    <View style={styles.container}>
      <Text style={styles.name}>Food</Text>
      <Text style={styles.amount}>3000</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    height: 80,
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