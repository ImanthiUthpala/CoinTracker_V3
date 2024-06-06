import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../../assets/Colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';




const CategoryList = ({ categoryList, handleDelete, navigationTarget }) => {

  const navigation = useNavigation();

  const handleEdit = (id, category) => {
   navigation.navigate('UpdateCategory', {category});
  }

  
  const handleCategoryPress = (categoryId, categoryIcon) => {
    if (navigationTarget === 'AddExpense') {
      navigation.navigate('AddExpense', {categoryId});
    } else {
      navigation.navigate('AddBudget', {categoryId, categoryIcon});
    }
  };
  /*const hadleExpense = (categoryId) => {
    navigation.navigate('AddExpense', {categoryId}); <---Here 
  }
*/
  

  return (

    <View>
      {categoryList?.length > 0 && (
        <View>
          {categoryList.map((category, index) => (

            <TouchableOpacity 
            key={index} 
            style={styles.container}
            onPress={() => handleCategoryPress(category.id, category.icon)}>

              <View style={styles.iconContainer}>
                {category.icon && (
                  <Text style={[styles.iconText, { backgroundColor: category?.color }]}>
                    {category.icon}
                  </Text>
                )}

              </View>
              <View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </View>

              <View style={styles.cardEdit}>

                <View >
                  <TouchableOpacity 
                    onPress={() => handleEdit(category.id, category)}
                  >
                    <FontAwesome6 name="edit" size={24} color="black" />

                  </TouchableOpacity>
                </View>
                <View>
              <TouchableOpacity
                onPress={() => handleDelete(category.id)}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>

            </View>

              </View>

      </TouchableOpacity>
      ))}
    </View>
  )
}
      </View >
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '97%',
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 15,
    height: 80,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  iconText: {
    fontSize: 20,
    padding: 16,
    borderRadius: 15,
    width:60,
  },
  categoryText: {
    fontSize: 18,
  },
  cardEdit: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
});

export default CategoryList;