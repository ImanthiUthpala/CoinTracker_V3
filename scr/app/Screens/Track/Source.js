import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export const Source = () => {

  const navigation = useNavigation();

  const handlePress = () =>{
    navigation.navigate('AddSource');
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>

        <TouchableOpacity
          onPress={handlePress}
          style={styles.addBtn}
        >
          <Ionicons name="add-circle-sharp" size={60} color="#82E80B" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    height: 1000,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  addBtn: {
    position:'absolute',
    top:350,
    right:5,

  }
});