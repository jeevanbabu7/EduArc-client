import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator, 
  SafeAreaView, 
  Platform,
  ScrollView
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { ID, storage } from '../../lib/appwrite/appwrite.js';
import getEnvVars from '../../config.js';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function UploadMaterial() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Log params for debugging
  console.log("Raw Params:", params);
  
  // Get courseId and courseName from params
  const courseId = params.courseId || params.courseid || '';
  const courseName = params.courseName || params.coursename || 'Course';
  
  const [materialTitle, setMaterialTitle] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { IP_ADDRESS } = getEnvVars();
  
  useEffect(() => {
    console.log("Course ID:", courseId);
    console.log("Course Name:", courseName);
  }, []);
  
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf', 
          'application/msword', 
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ],
        copyToCacheDirectory: true,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0];
        console.log("Selected file:", selectedFile);
        
        // File size check (limit to 10MB)
        if (selectedFile.size > 10 * 1024 * 1024) {
          Alert.alert('File Too Large', 'Please select a file smaller than 10MB');
          return;
        }
        
        setFile(selectedFile);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };
  
  const uploadMaterial = async () => {
    if (!materialTitle.trim()) {
      Alert.alert('Missing Information', 'Please enter a title for the material');
      return;
    }
    
    if (!file) {
      Alert.alert('Missing File', 'Please select a file to upload');
      return;
    }
    
    if (!courseId) {
      Alert.alert('Error', 'Course ID is missing. Please go back and try again.');
      return;
    }
    
    setUploading(true);
    
    try {
      // Step 1: Prepare the file
      const uri = file.uri;
      const fileId = ID.unique();
      
      // Method 1: Using formData for better cross-platform compatibility
      const formData = new FormData();
      formData.append('file', {
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
        name: file.name,
        type: file.mimeType
      });
      
      // Step 2: Upload to Appwrite
      const endpoint = "https://cloud.appwrite.io/v1";
      const projectId = "67bcccfe0010a29974a4";
      const bucketId = "67bccd990005a5d175c4";
      
      const headers = {
        'Content-Type': 'multipart/form-data',
        'X-Appwrite-Project': projectId
      };
      
      // Make the upload request
      console.log(`Uploading to ${endpoint}/storage/buckets/${bucketId}/files`);
      
      const uploadResponse = await axios({
        method: 'post',
        url: `${endpoint}/storage/buckets/${bucketId}/files`,
        headers: headers,
        data: formData,
        params: { fileId }
      });
      
      console.log('Upload response:', uploadResponse.data);
      
      // Step 3: Get the file URL
      const fileUrl = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
      
      // Step 4: Save material to your database
      console.log("Saving material to database:", {
        courseId,
        title: materialTitle,
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.mimeType
      });
      
      const materialResponse = await fetch(`${IP_ADDRESS}:3000/api/materials/add-material`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          title: materialTitle,
          fileUrl,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.mimeType
        })
      });
      
      if (materialResponse.ok) {
        Alert.alert('Success', 'Material uploaded successfully', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        const errorData = await materialResponse.json();
        throw new Error(errorData.message || 'Failed to save material in database');
      }
    } catch (error) {
      console.error('Error uploading material:', error);
      Alert.alert('Upload Failed', 
        `Could not upload material: ${error.message || 'Unknown error'}. Please try again.`
      );
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Upload Material',
          headerBackTitle: 'Back',
        }}
      />
      
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Upload Learning Material</Text>
            <Text style={styles.courseTitle}>Course: {courseName}</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.label}>Material Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a descriptive title"
              value={materialTitle}
              onChangeText={setMaterialTitle}
              placeholderTextColor="#999"
            />
            
            <Text style={styles.label}>Document File</Text>
            <Text style={styles.supportedFormats}>Supported formats: PDF, Word, PowerPoint</Text>
            
            <TouchableOpacity 
              style={styles.filePicker}
              onPress={pickDocument}
              disabled={uploading}
            >
              {file ? (
                <View style={styles.selectedFileContainer}>
                  <Ionicons name="document-text" size={24} color="#0504aa" />
                  <View style={styles.fileDetails}>
                    <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
                      {file.name}
                    </Text>
                    <Text style={styles.fileSize}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.changeButton}
                    onPress={pickDocument}
                    disabled={uploading}
                  >
                    <Text style={styles.changeButtonText}>Change</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.selectFilePrompt}>
                  <Ionicons name="cloud-upload-outline" size={32} color="#666" />
                  <Text style={styles.selectFileText}>Tap to select a document</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.uploadButton,
                (!materialTitle.trim() || !file || uploading) && styles.disabledButton
              ]}
              onPress={uploadMaterial}
              disabled={!materialTitle.trim() || !file || uploading}
            >
              {uploading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="#fff" size="small" />
                  <Text style={styles.uploadingText}>Uploading...</Text>
                </View>
              ) : (
                <>
                  <Ionicons name="arrow-up-circle" size={20} color="#fff" />
                  <Text style={styles.uploadButtonText}>Upload Material</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  courseTitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    color: '#333',
  },
  supportedFormats: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  filePicker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  selectFilePrompt: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectFileText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  selectedFileContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileDetails: {
    flex: 1,
    marginLeft: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  fileSize: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  changeButton: {
    backgroundColor: '#0504aa',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  uploadButton: {
    backgroundColor: '#0504aa',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabledButton: {
    backgroundColor: '#9e9e9e',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
