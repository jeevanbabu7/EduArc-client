import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Tool = ({ title, iconSource, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {iconSource && (
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      )}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Tool

const styles = StyleSheet.create({
  
  button: {
    backgroundColor: '#ffff', // White background
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius:10,
    alignItems: 'center',
    // borderWidth:2,
    borderColor:'white',
    shadowColor: '#00126b', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  title: {
    fontSize: 12,
    color: '#1E124A', // Black text
    marginBottom: 4, // Space between title and icon
  },
  icon: {
    width: 40,  // Set width of the icon
    height: 35, // Set height of the icon
    marginTop: 4,
    color:'white'
  },
});
