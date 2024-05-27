import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CategoryList from '../../components/CategoryList';
import { deleteCategory, getCategory } from '../../../../BackEnd/db/Tables/categories';
import Colors from '../../../../assets/Colors';



export const Category = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to detect if screen is focused

  const handlePress = () =>{
    navigation.navigate('AddCategory');
  };

  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {

    try {
      // Call the insertSource function with the collected data
      const data = await new Promise ((resolve, reject) => {
        getCategory((result) => {
          resolve(result);
        });
      });
        setCategoryList(data);
        console.log('Category fetch successfully!', data);
  
    } catch (error) {
      console.error('Error fetching categories RRR:', error);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this category?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deletion canceled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try{
              deleteCategory(id); //delete from database
              const updatedList = categoryList.filter((category) => category.id !== id); //Filter out deleted source
              setCategoryList(updatedList); // update state with filtered list
             console.log('Category deleted sss');
           }catch (error){
             console.error('Error deleting category from category screen:', error);
           }
          },
          style: 'destructive',
        },
      ],
      {cancelable: false}
    );
   
  };

  useEffect(()=>{
    //Fetch source on component mount
    if(isFocused){
      fetchCategoryList();
    }
   
  }, [isFocused]); // Empty dependency array: runs only once on mount 

  return (
    <>
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.ScrollViewContent}>
      <CategoryList categoryList={categoryList} handleDelete={handleDelete}/>

      </ScrollView>

        <TouchableOpacity
          onPress={handlePress}
          style={styles.addBtn}
        >
          <Ionicons name="add-circle-sharp" size={60} color={Colors.GREEN} />
        </TouchableOpacity>

    </View>
   
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:  Colors.WHITE,
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