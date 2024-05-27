import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useState, useContext } from 'react'
import { TextInput } from 'react-native-gesture-handler'

import Colors from '../../../../assets/Colors'
import ColorPicker from '../../components/ColorPicker'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { insertCategory } from '../../../../BackEnd/db/Tables/categories';
import { useNavigation } from '@react-navigation/native'



export const AddCategory = () => {

  const navigation = useNavigation();

  const [selectedIcon, setSelectedIcon] = useState('IC');
  const [selectedColor, setSelectedColor] = useState(Colors.PURPLE);
  const [categoryName, setCategoryName] = useState('');

  //to save data

  //const db = useContext(DatabaseContext);

  const onCreateCategory = async()=>{

    
    if (!categoryName) {
      console.error('Please enter a category name.');
      return; // Prevent unnecessary database call if source name is empty
    }

    try {
      // Call the insertSource function with the collected data
      insertCategory(categoryName, selectedIcon, selectedColor);
        console.log('Category added successfully!');
        navigation.goBack();
      // Optionally, clear the form after successful insertion
      setCategoryName('');
      setSelectedIcon('IC');
      setSelectedColor(Colors.PURPLE);
      
      
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <View style={{
      marginTop: 20,
      padding: 20
    }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor, textAlign:'justify' }]}
          maxLength={2}
          minLength={2}
          value={selectedIcon}
          onChangeText={(value) => setSelectedIcon(value)}
        />
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>
      {/*add category name */}
      <View style={styles.inputView}>
        <MaterialCommunityIcons name="label-multiple" size={24} color={Colors.GRAY} />
        <TextInput
        placeholder='Category Name'
        value={categoryName}
        onChangeText={(value) => setCategoryName(value)}
          style={{
            width: '100%',
            fontSize: 17
          }} />
      </View>
          <TouchableOpacity style={styles.button}
          disabled={!categoryName}
          onPress={onCreateCategory}
          >
            <Text style={{textAlign:'center',
              fontSize:20,
              color:Colors.WHITE
            }}>Add Category</Text>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  iconInput: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    borderRadius: 100,
    paddingHorizontal: 28,
    color: Colors.WHITE
  },
  inputView: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    padding: 14,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    marginTop: 20
  },
  button: {
    backgroundColor:Colors.GREEN,
    padding:15,
    borderRadius:10,
    marginTop:30
  }
})
