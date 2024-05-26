import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../../assets/Colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';




const SourceList = ({ sourceList, handleDelete }) => {

  const navigation = useNavigation();

  const handleEdit = (id, source) => {
   navigation.navigate('UpdateSource', {source});
  }

  const hadleIncome = (sourceId) => {
    navigation.navigate('AddIncome', {sourceId});
  }

  

  return (

    <View>
      {sourceList?.length > 0 && (
        <View>
          {sourceList.map((source, index) => (

            <TouchableOpacity 
            key={index} 
            style={styles.container}
            onPress={() => hadleIncome(source.id)}>

              <View style={styles.iconContainer}>
                {source.icon && (
                  <Text style={[styles.iconText, { backgroundColor: source?.color }]}>
                    {source.icon}
                  </Text>
                )}

              </View>
              <View>
                <Text style={styles.sourceText}>{source.name}</Text>
              </View>

              <View style={styles.cardEdit}>

                <View >
                  <TouchableOpacity 
                    onPress={() => handleEdit(source.id, source)}
                  >
                    <FontAwesome6 name="edit" size={24} color="black" />

                  </TouchableOpacity>
                </View>
                <View>
              <TouchableOpacity
                onPress={() => handleDelete(source.id)}
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
  sourceText: {
    fontSize: 18,
  },
  cardEdit: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});

export default SourceList;

