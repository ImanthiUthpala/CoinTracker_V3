import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Bill_Reminder = () => {
  return (
    <View style={styles.container}>
      <Text>Bill Reminder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
