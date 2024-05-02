import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Expense_listItem from '../../components/Expense_listItem';
import Expense_list from '../../components/Expense_list';
import { FontAwesome5 } from '@expo/vector-icons';


 export const Expense = () => {

  return (

    <View style={{gap:5, padding: 5}}>
      <View style={style.header}>
        <Text>Name</Text>
        <Text>Amount</Text>
      </View>

      <Expense_list />

      <TouchableOpacity
      style={style.floatingButton}
      >  
      <FontAwesome5 name="plus-square" size={50} color="black" />
      </TouchableOpacity>
      
    </View>
  );
};




const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingvertical: 30,
  },

  floatingButton: {
    position: 'absolute',
    width: 100,
    height: 100,
    left: 295,
    top: 530,
  }
})