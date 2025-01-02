import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Tool = ({ title, iconSource }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.title}>{title}</Text>
      {iconSource && (
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      )}
    </TouchableOpacity>
  );
};

export default Tool

const styles = StyleSheet.create({
  
  button: {
    backgroundColor: '#fff', // White background
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  title: {
    fontSize: 14,
    color: '#000', // Black text
    marginBottom: 4, // Space between title and icon
  },
  icon: {
    width: 45,  // Set width of the icon
    height: 45, // Set height of the icon
    marginTop: 4,
  },
});
