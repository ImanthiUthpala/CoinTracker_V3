// IncomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Source } from './Source';




import { getIncome } from '../../../../BackEnd/db/Tables/income'; // Import function to fetch incomes
import { useNavigation } from '@react-navigation/native';

export const Income = ({navigation}) => {



  return (

    
    
    <View style={styles.container}>
        <View style={{
          padding: 30,
          justifyContent: 'space-between'
        }}>
          <Text style={styles.titleText}>
            Total Income
          </Text>

          <Text style={styles.amountText}>
            Rs. 0.00
          </Text>
        </View>
        <View style={styles.bottomContainer}>

          <TouchableOpacity 
          style={styles.addBtn}
          onPress={()=> navigation.navigate('Source')
          }
          >
            <Ionicons name="add-circle-sharp" size={60} color="#82E80B" />
          </TouchableOpacity>

        </View>
      </View>
  );
};

//export default Income;



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
  addBtn: {
    alignSelf: 'flex-end',
    marginTop:350,
    marginRight:10,

  }
  /* header: {
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
   }*/
})