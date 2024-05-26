import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useState,useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Colors from '../../../../assets/Colors'
import ColorPicker from '../../components/ColorPicker'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { updateSource, getSourceById } from '../../../../BackEnd/db/Tables/sources';
import { useNavigation, useRoute } from '@react-navigation/native'


export const UpdateSource = () => {

  const navigation = useNavigation();
  const route = useRoute()
  const {source} = route.params;

  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedColor, setSelectedColor] = useState(Colors.PURPLE);
  const [sourceName, setSourceName] = useState('');

  useEffect (() => {
    if (source) {
      setSelectedIcon(source.icon || '');
      setSelectedColor(source.color || Colors.PURPLE);
      setSourceName(source.name || '');
    }
  }, [source]);

 

  const handleEdit = async () => {
    if (!sourceName) {
      console.error('Please enter a source name');
      return;
    }
    try{
      updateSource(source.id, sourceName, selectedIcon, selectedColor);
      console.log('Source updated successfully');
      navigation.goBack();
    }catch (error){
      console.error('Error updating source:', error);
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
          onChangeText={setSelectedIcon}
        />
        <ColorPicker
         selectedColor={selectedColor}
         setSelectedColor={setSelectedColor}
          
        />
      </View>
      {/*add source name */}
      <View style={styles.inputView}>
        <MaterialCommunityIcons name="label-multiple" size={24} color={Colors.GRAY} />
        <TextInput
        placeholder='Source Name'
        value={sourceName}
        onChangeText={setSourceName}
          style={{
            width: '100%',
            fontSize: 17
          }} />
      </View>
          <TouchableOpacity style={styles.button}
          disabled={!source.name}
          onPress={handleEdit}
          >
            <Text style={{textAlign:'center',
              fontSize:20,
              color:Colors.WHITE
            }}>Edit Source</Text>
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
