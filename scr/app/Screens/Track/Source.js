import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import SourceList from '../../components/SourceList';
import { getSources } from '../../../../BackEnd/db/Tables/sources';
import { DatabaseContext } from '../../../../BackEnd/db/DatabaseContext'
import database from '../../../../BackEnd/db/database';



export const Source = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to detect if screen is focused

  const handlePress = () =>{
    navigation.navigate('AddSource');
  };

  const [sources,setSources] = useState([]);
 // const db = useContext(DatabaseContext);

  const fetchSources = async () => {

    try {
      // Call the insertSource function with the collected data
      const data = await getSources();
        setSources(data);
        console.log('Source fetch successfully!', data);
  
    } catch (error) {
      console.error('Error fetching sources RRR:', error);
    }
  };

  useEffect(()=>{
    //Fetch source on component mount
    if(isFocused){
      fetchSources();
    }
   
  }, [isFocused]); // Empty dependency array: runs only once on mount

  return (
    <View style={styles.container}>

      <SourceList sourceList={sources}/>

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