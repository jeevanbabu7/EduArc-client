import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCard from '../../components/MaterialCard';
import { useRouter, useLocalSearchParams } from 'expo-router';
import getEnvVars from '../../config.js';
import { Ionicons } from '@expo/vector-icons';

function Materials() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const { IP_ADDRESS } = getEnvVars();
  
  useEffect(() => {
    // Parse the course data from params
    if (params.courseData) {
      try {
        const courseData = JSON.parse(params.courseData);
        setCourse(courseData);
        console.log("Received course data:", courseData);
        
        // Fetch materials for this course (if you have an API endpoint for this)
        fetchMaterials(courseData._id);
      } catch (error) {
        console.error("Error parsing course data:", error);
        Alert.alert("Error", "Could not load course information");
      }
    }
  }, []);
  
  async function fetchMaterials(courseId) {  
    try {
      // Replace with your actual API endpoint
      console.log("Fetching materials for course:");
      
      const response = await fetch(`${IP_ADDRESS}:3000/api/material/get-materials/${courseId}`);

      
      
      if (response.ok) {
        const data = await response.json();
        // console.log("Materials data:", data.materials);
        
        setMaterials(data.materials.materials || []);
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
      // For now, let's use dummy data until the API is implemented
      // setMaterials([
      //   { _id: '1', title: 'Module 1', fileUrl: '' },
      //   { _id: '2', title: 'Module 2', fileUrl: '' },
      //   { _id: '3', title: 'Module 3', fileUrl: '' },
      // ]);
    }
  };

  const handleUpload = () => {
    if (!course) {
      Alert.alert('Error', 'No course selected');
      return;
    }
    
    try {
      // Debug the course data
      console.log("Navigation attempt with course:", course);
      
      // Fix path formatting and ensure it works with Expo Router
      router.push({
        pathname: "/UploadMaterial",
        params: {
          courseId: course._id,
          courseName: course.name
        }
      });
    } catch (error) {
      console.error("Navigation error:", error);
      
      // Fallback approach
      router.push(`/(courses)/UploadMaterial?courseId=${course._id}&courseName=${encodeURIComponent(course.name)}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Course Title Header */}
      {course && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{course.name}</Text>
          <Text style={styles.headerSubtitle}>Course Materials</Text>
        </View>
      )}

      {/* Material List */}
      <FlatList
        style={styles.listContainer}
        data={materials}
        renderItem={({ item }) => (
          <MaterialCard
            title={item.title}
            onPress={() => {
              console.log("Material selected:", item);
              
              // if (item.fileUrl) {
              //   router.push({
              //     pathname: '(courses)/ViewMaterial',
              //     params: { materialId: item._id, materialUrl: item.fileUrl }
              //   });
              // } else {
              //   Alert.alert('Info', 'No file available for this material yet.');
              // }
            }}
          />
        )}
        keyExtractor={(item) => item._id || item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No materials added yet</Text>
          </View>
        )}
      />

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Ionicons name="cloud-upload-outline" size={20} color="#fff" style={styles.uploadIcon} />
        <Text style={styles.uploadButtonText}>Add Material</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Materials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
  },
  uploadButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#0504aa',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  uploadIcon: {
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
