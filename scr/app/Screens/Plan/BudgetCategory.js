import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CategoryList from '../../components/CategoryList';
import { getCategory, deleteCategory } from '../../../../BackEnd/db/Tables/categories';
import Colors from '../../../../assets/Colors';
import { updateBudget } from '../../../../BackEnd/db/Tables/budget';

export const BudgetCategory = ({route}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [categoryList, setCategoryList] = useState([]);


  const fetchCategoryList = async () => {
    try {
      const data = await new Promise ((resolve, reject) => {
        getCategory((result) => {
          resolve(result);
        });
      });
      setCategoryList(data);
      console.log('Categories fetched successfully', data);
    } catch (error){
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchCategoryList();
    }
  }, [isFocused]);

  /*const handleCategoryPress = (categoryId) => {
    navigation.navigate('AddBudget', {categoryId});
  }; */

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
            try {
              deleteCategory(id); // delete from database
              const updatedList = categoryList.filter((category) => category.id !== id); // filter out deleted category
              setCategoryList(updatedList); // update state with filtered list
              console.log('Category deleted');
            } catch (error) {
              console.error('Error deleting category: ', error);
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: false}
    );
  };

  const handleEdit = (category) => {
    navigation.navigate('UpdateCategory', { category }); //Navigate to UpdateCategory for edition
  };

  return(
    <View style={StyleSheet.container}>
      <ScrollView contentContainerStyle={StyleSheet.ScrollViewContent}>
        <CategoryList
          categoryList={categoryList}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          navigationTarget="AddBudget"
          />
      </ScrollView>
      <TouchableOpacity
      onPress={() => navigation.navigate('AddCategory')}
       style={styles.addBtn} >

      <Ionicons name="add-circle-sharp" size={60} color={Colors.GREEN} />

      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  addBtn: {
    position:'absolute',
    top:470,
    right: 10,
  },
});

//export default BudgetCategory;