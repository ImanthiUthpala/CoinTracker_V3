import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import Colors from '../../../assets/Colors';
import { FontAwesome6 } from '@expo/vector-icons';

const SourceList = ({ sourceList }) => {
  return (
    /*<View>
      {sourceList?.length > 0 && (
        <View>
          {sourceList.map((source, index) => (
            <View key={index} style={styles.container}>
              <View style={styles.iconContainer}>
                {typeof source.icon === 'string' && (
                  <Text style={[styles.iconText, { backgroundColor: source.color }]}>{source.icon}</Text>
                )}
              </View>
              <View>
                {typeof source.name === 'string' && <Text style={styles.sourceText}>{source.name}</Text>}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>*/

    //
    
    <View>
      {sourceList?.length > 0 && (
    <View>
    {sourceList.map((source,index) => (
      <View key={index} style={styles.container}> 
        <View style={styles.iconContainer}>
          {source.icon && (
            <Text style={[styles.iconText, {backgroundColor:source?.color}]}>
            {source.icon}
            </Text>
          )}
          
        </View>
        <View>
          <Text style={styles.sourceText}>{source.name}</Text>
          </View>
          <View>
          <TouchableOpacity>
          <FontAwesome6 name="edit" size={24} color="black" />
          </TouchableOpacity>
          </View>
          
      </View>
    ))}
  </View>
      )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    backgroundColor: Colors.GRAY,
    padding: 10,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  iconText: {
    fontSize: 35,
    padding: 16,
    borderRadius: 15,
  },
  sourceText: {
    fontSize: 20,
  },
});

export default SourceList;

/* 
<View>
  {sourceList.map((source,index) => (
    <View key={index}>
      <View>
        <Text style={[styles.iconText, {backgroundColor:source?.color}]}>
        {source.icon}
        </Text>
      </View>
      <View>
        <Text>{source.name}</Text>
        </View>
    </View>
  ))}
</View>
*/