import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useState, useContext } from 'react'
import { TextInput } from 'react-native-gesture-handler'

import Colors from '../../../../assets/Colors'
import ColorPicker from '../../components/ColorPicker'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { insertSource } from '../../../../BackEnd/db/Tables/sources'
import { DatabaseContext } from '../../../../BackEnd/db/DatabaseContext'



export const AddSource = () => {

  const [selectedIcon, setSelectedIcon] = useState('IC');
  const [selectedColor, setSelectedColor] = useState(Colors.PURPLE);
  const [sourceName, setSourceName] = useState();

  //to save data

  const db = useContext(DatabaseContext);
  const onCreateSource = async()=>{

    
    if (!sourceName) {
      console.error('Please enter a source name.');
      return; // Prevent unnecessary database call if source name is empty
    }

    try {
      // Call the insertSource function with the collected data
      await insertSource(sourceName, selectedIcon, selectedColor);
      console.log('Source added successfully!');
      // Optionally, clear the form after successful insertion
      setSourceName('');
      setSelectedIcon('IC');
      setSelectedColor(Colors.PURPLE);
    } catch (error) {
      console.error('Error adding source:', error);
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
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>
      {/*add source name */}
      <View style={styles.inputView}>
        <MaterialCommunityIcons name="label-multiple" size={24} color={Colors.GRAY} />
        <TextInput placeholder='Source Name'
        onChangeText={(value)=>setSourceName(value)}
          style={{
            width: '100%',
            fontSize: 17
          }} />
      </View>
          <TouchableOpacity style={styles.button}
          disabled={!sourceName}
          onPress={()=>onCreateSource()}
          >
            <Text style={{textAlign:'center',
              fontSize:20,
              color:Colors.WHITE
            }}>Add Source</Text>
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
    gap: 5,
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
