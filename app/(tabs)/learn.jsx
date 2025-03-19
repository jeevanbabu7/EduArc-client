import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity,TextInput } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import LearnCourseCard from '../../components/LearnCourseCard.jsx';
import { useRouter } from 'expo-router';
import RBSheet from 'react-native-raw-bottom-sheet';
import getEnvVars from '../../config.js';
import { useUser } from '../../context/userContext.jsx';
const Learn = () => {
  const router = useRouter();
  const {IP_ADDRESS} = getEnvVars();
  // Create refs for each bottom sheet
  const refMenuSheet = useRef(null);
  const refAddCourseSheet = useRef(null);
  const refSettingsSheet = useRef(null);
  const [courses, setCourses] = useState([]);
  const { user } = useUser();
  const [courseName, setCourseName] = useState('');

  
  useEffect(() => {
    const fetchCourses = async () => {
      const course = await fetch(`${IP_ADDRESS}:3000/api/course/get-courses/67da90c4f3484363454fb84a`);
      const courseData = await course.json();
      setCourses(courseData.courses);

    }
    fetchCourses();
  }, []);
  

  const handleAddCourse = async () => {
    try {
      console.log(courseName);
      
      const response = await fetch(`${IP_ADDRESS}:3000/api/course/add-course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '67da90c4f3484363454fb84a',
          name: courseName,
        }),
      });
      const data = await response.json();
      console.log(data.course);
      
      if (response.ok) {
        setCourses([...courses, data]);
        refAddCourseSheet.current.close();
      }
    }catch(err) {
      console.log(err);
    }
  }

  const onDelete = async (courseId) => {
    try {
      const response = await fetch(`${IP_ADDRESS}:3000/api/course/delete-course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setCourses(courses.filter((course) => course._id !== courseId));
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top Bar */}
      <View style={styles.topbar}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>My Courses</Text>
        <TouchableOpacity onPress={() => refMenuSheet.current.open()}>
          <Ionicons name="menu" size={22} color="#0504aa" />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet for Menu */}
      <RBSheet
        ref={refMenuSheet}
        draggable={true}
        closeOnPressMask={true}
        customStyles={styles.sheet}
        animationType="slide"
        onClose={() => setTimeout(() => console.log('Sheet Closed'), 100)}
      >
        {/* <Text style={styles.sheetTitle}>Menu</Text> */}
        <TouchableOpacity onPress={() => refSettingsSheet.current.open()}>
          <Text style={styles.sheetItem}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.sheetItem}>Logout</Text>
        </TouchableOpacity>
      </RBSheet>

      {/* Bottom Sheet for Add Course */}
      <RBSheet
        ref={refAddCourseSheet}
        draggable={true}
        closeOnPressMask={true}
        dragOnContent={true}
        customStyles={{
          wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' },
          container: {
            height: 250, // Adjust height dynamically if needed
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20, // Only horizontal padding
            paddingBottom: 20, // Avoid unnecessary top padding
            backgroundColor: '#f0f2ff',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute', // Ensures it starts from the very top
            bottom: 0, // Aligns it to the bottom
          },
          draggableIcon: { 
            backgroundColor: '#000',
            marginTop:0
          },
        }}
      >
        <Text style={styles.sheetTitle}>Add New Course</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Course Name"
          placeholderTextColor="#888"
          value={courseName}
          onChangeText={(text) => setCourseName(text)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleAddCourse}>
          <Text style={styles.submitButtonText}>Add Course</Text>
        </TouchableOpacity>
      </RBSheet>




      {/* Course List */}
      <FlatList
        style={styles.cardContainer}
        data={courses}
        renderItem={({ item }) => (
          <LearnCourseCard name={item.name} onDelete={onDelete} onPress={() => router.push('(courses)/Tools')} />
        )}
        keyExtractor={(item) => item.key}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={() => refAddCourseSheet.current.open()}>
        <Text style={styles.uploadButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Learn;

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContainer: {
    backgroundColor: '#ffff',
  },
  uploadButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#0504aa',
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 30,
  },
  sheet: {
    wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' },
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      backgroundColor: '#f0f2ff',
      height: '40%',
    },
    draggableIcon: { backgroundColor: '#000' },
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sheetItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#0504aa',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
