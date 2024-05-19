import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../../assets/Colors';

const SourceList = ({ sourceList }) => {
  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    backgroundColor: Colors.WHITE,
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
