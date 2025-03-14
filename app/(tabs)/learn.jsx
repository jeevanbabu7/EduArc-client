import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity,TextInput } from 'react-native';
import React, { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MaterialCard from '../../components/MaterialCard';
import { useRouter } from 'expo-router';
import RBSheet from 'react-native-raw-bottom-sheet';

const Learn = () => {
  const router = useRouter();

  // Create refs for each bottom sheet
  const refMenuSheet = useRef(null);
  const refAddCourseSheet = useRef(null);
  const refSettingsSheet = useRef(null);

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
        customStyles={{
          wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' },
          container: {
            height: 250, // Adjust height dynamically if needed
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20, // Only horizontal padding
            paddingBottom: 20, // Avoid unnecessary top padding
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute', // Ensures it starts from the very top
            bottom: 0, // Aligns it to the bottom
          },
        }}
      >
        <Text style={styles.sheetTitle}>Add New Course</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Course Name"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Add Course</Text>
        </TouchableOpacity>
      </RBSheet>




      {/* Course List */}
      <FlatList
        style={styles.cardContainer}
        data={[
          { key: 'Data Structures' },
          { key: 'Operating Systems' },
          { key: 'Linear Algebra' },
          { key: 'Commerce' },
          { key: 'Maths' },
          { key: 'Science' },
          { key: 'DBMS' }
        ]}
        renderItem={({ item }) => (
          <MaterialCard title={item.key} onPress={() => router.push('(courses)/Materials')} />
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
      backgroundColor: '#fff',
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
