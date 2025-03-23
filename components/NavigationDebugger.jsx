import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function NavigationDebugger({ course }) {
  if (!course) return null;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navigation Debugger</Text>
      <Text>Course ID: {course._id}</Text>
      <Text>Course Name: {course.name}</Text>
      
      <View style={styles.linkContainer}>
        <Text style={styles.sectionTitle}>Direct Links:</Text>
        
        <Link 
          href={{
            pathname: "/(courses)/UploadMaterial",
            params: { courseId: course._id, courseName: course.name }
          }}
          style={styles.link}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.linkText}>Link with params object</Text>
          </TouchableOpacity>
        </Link>
        
        <Link 
          href={`/(courses)/UploadMaterial?courseId=${course._id}&courseName=${encodeURIComponent(course.name)}`}
          style={styles.link}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.linkText}>Link with query string</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#ffe8e8',
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
  },
  linkContainer: {
    marginTop: 8,
  },
  link: {
    marginVertical: 4,
  },
  linkText: {
    color: '#0000ff',
    textDecorationLine: 'underline',
    padding: 4,
  }
});
