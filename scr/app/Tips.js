import React from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';

export const Tips = () => {
  return(
    
    <View style={{gap:5, padding: 5}}>

    <View style={styles.container}>
      <Text>Tip#1</Text>
    </View>

    <View style={styles.container}>
        <Text>Tip#2</Text>
      </View>
      
      <View style={styles.container}>
        <Text>Tip#3</Text>
      </View>
      
      </View>
    

      

  );
 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'white',
    padding: 10,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    backgroundColor: 'gray',
    paddingVertical: 80,
  }})