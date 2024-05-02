import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Income_listItem from '../../components/Income_listItem';
import Income_list from '../../components/Income_list';
import { FontAwesome5 } from '@expo/vector-icons';


 export const Income = () => {

  return (

    <View style={{gap:5, padding: 5}}>
      <View style={style.header}>
        <Text>Name</Text>
        <Text>Amount</Text>
      </View>

      <Income_list />

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
    paddingVertical: 30,
  },

  floatingButton: {
    position: 'absolute',
    width: 100,
    height: 100,
    left: 295,
    top: 530,
  }
})