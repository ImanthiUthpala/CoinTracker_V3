import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Income_listItem from '../../components/Income_listItem';
import Income_list from '../../components/Income_list';

export const Income = () => {
  return (
    <View style={{gap:5, padding: 5}}>
      <View style={style.header}>
        <Text>Name</Text>
        <Text>Amount</Text>
      </View>

      <Income_list />

    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingvertical: 20,
  }
})