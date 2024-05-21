import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import SourceList from '../../components/SourceList';
import { deleteSource, getSources } from '../../../../BackEnd/db/Tables/sources';
import { DatabaseContext } from '../../../../BackEnd/db/DatabaseContext'
import database from '../../../../BackEnd/db/database';
import Colors from '../../../../assets/Colors';



export const Source = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to detect if screen is focused

  const handlePress = () =>{
    navigation.navigate('AddSource');
  };

  const [sourceList, setSourceList] = useState([]);
 // const db = useContext(DatabaseContext);

  const fetchSourceList = async () => {

    try {
      // Call the insertSource function with the collected data
      const data = await new Promise ((resolve, reject) => {
        getSources((result) => {
          resolve(result);
        });
      });
        setSourceList(data);
        console.log('Source fetch successfully!', data);
  
    } catch (error) {
      console.error('Error fetching sources RRR:', error);
    }
  };

  const handleDelete = async (id) => {
    try{
       await deleteSource(id); //delete from database
       const updatedList = sourceList.filter((source) => source.id !== id); //Filter out deleted source
       setSourceList(updatedList); // update state with filtered list
      console.log('Source deleted sss');
    }catch (error){
      console.error('Error deleting source from source screen:', error);
    }
  };

  useEffect(()=>{
    //Fetch source on component mount
    if(isFocused){
      fetchSourceList();
    }
   
  }, [isFocused]); // Empty dependency array: runs only once on mount 

  return (
    <>
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.ScrollViewContent}>
      <SourceList sourceList={sourceList} handleDelete={handleDelete}/>

      </ScrollView>

      {/*<View style={styles.bottomContainer}> */}

       {/* <SourceList sourceList={sourceList} /> */} 

        <TouchableOpacity
          onPress={handlePress}
          style={styles.addBtn}
        >
          <Ionicons name="add-circle-sharp" size={60} color="#82E80B" />
        </TouchableOpacity>

      {/*</View> */}
    </View>
   
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:  Colors.GRAY,
    height:'100%'
  },
  ScrollViewContent:{
    paddingBottom: 100,
  },
  bottomContainer: {
    height: 1,
    width: '100%',
    backgroundColor:'#fff',
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  addBtn: {
    position:'absolute',
    top:480,
    right:5,

  }
});