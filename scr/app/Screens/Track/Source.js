import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Source = () => {
  return (
    <View style={styles.container}>
      <Text>Sources</Text>
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