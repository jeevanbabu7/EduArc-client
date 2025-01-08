import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const CourseCard = ({ title }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <FontAwesome name="book" size={20} color="#0504aa" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>Last opened: Jan 1, 2025</Text> {/* Dummy date */}
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="ellipsis-vertical" size={20} color="#0504aa" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffff',
    borderRadius: 8,
    shadowColor: '#00126b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    margin: 8,

    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // Ensures the text takes available space
    marginHorizontal: 10, // Spacing between text and icons
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#555', // Subtle color for the date
    marginTop: 4,
  },
});
 