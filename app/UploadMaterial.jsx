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
  ScrollView,
  FlatList
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { ID } from '../lib/appwrite/appwrite.js';
import { uploadFileToAppwrite } from '../lib/appwrite/fileStorage.js';
import getEnvVars from '../config.js';
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
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { IP_ADDRESS, APPWRITE_PROJECT_ID, PDF_BUCKET_ID } = getEnvVars();
  
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
        multiple: true, // Enable multiple file selection
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Filter out files larger than 10MB
        const validFiles = result.assets.filter(file => {
          if (file.size > 10 * 1024 * 1024) {
            Alert.alert('File Too Large', `File "${file.name}" is larger than 10MB and was skipped`);
            return false;
          }
          return true;
        });
        
        // Add the new files to existing files
        setFiles(prevFiles => [...prevFiles, ...validFiles]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  
  const uploadMaterial = async () => {
    if (!materialTitle.trim()) {
      Alert.alert('Missing Information', 'Please enter a title for the material');
      return;
    }
    
    if (files.length === 0) {
      Alert.alert('Missing Files', 'Please select at least one file to upload');
      return;
    }
    
    if (!courseId) {
      Alert.alert('Error', 'Course ID is missing. Please go back and try again.');
      return;
    }
    
    setUploading(true);
    
    try {
      // Upload all files to Appwrite storage and collect their URLs
      const fileUrls = [];
      const fileDetails = [];
      
      for (const file of files) {
        const uploadResult = await uploadFileToAppwrite(file, APPWRITE_PROJECT_ID, PDF_BUCKET_ID);
        console.log('Upload response:', uploadResult.response);
        console.log('File URL:', uploadResult.fileUrl);
        
        fileUrls.push(uploadResult.fileUrl);
        fileDetails.push({
          fileName: file.name,
          fileUrl: uploadResult.fileUrl,
          fileSize: file.size,
          fileType: file.mimeType
        });
      }

      console.log("File URLs:", fileDetails);
      
      
      // Save material with multiple files to database
      console.log("Saving material with files to database:", {
        courseId,
        title: materialTitle,
        files: fileDetails
      });
      
      const materialResponse = await fetch(`${IP_ADDRESS}:3000/api/material/add-material`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          title: materialTitle,
          files: fileDetails
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
            
            <Text style={styles.label}>Document Files</Text>
            <Text style={styles.supportedFormats}>Supported formats: PDF, Word, PowerPoint (Max 10MB per file)</Text>
            
            {files.length > 0 && (
              <View style={styles.selectedFilesContainer}>
                {files.map((file, index) => (
                  <View key={index} style={styles.selectedFileContainer}>
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
                      style={styles.removeButton}
                      onPress={() => removeFile(index)}
                      disabled={uploading}
                    >
                      <Ionicons name="close-circle" size={22} color="#ff4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.filePicker}
              onPress={pickDocument}
              disabled={uploading}
            >
              <View style={styles.selectFilePrompt}>
                <Ionicons name="cloud-upload-outline" size={32} color="#666" />
                <Text style={styles.selectFileText}>Tap to select documents</Text>
                <Text style={styles.selectFileSubtext}>You can select multiple files</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.uploadButton,
                (!materialTitle.trim() || files.length === 0 || uploading) && styles.disabledButton
              ]}
              onPress={uploadMaterial}
              disabled={!materialTitle.trim() || files.length === 0 || uploading}
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
  selectFileSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  selectedFilesContainer: {
    marginBottom: 16,
  },
  selectedFileContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
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
  removeButton: {
    padding: 4,
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
