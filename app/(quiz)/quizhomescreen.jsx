import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView,Image,Platform,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import scan from '../../assets/icons/scanold.png';
import upload from '../../assets/icons/newfolder.png';
import getEnvVars from '../../config.js';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Button, ButtonText, Spinner } from "@gluestack-ui/themed";
import { useToast, Toast, VStack, ToastDescription } from '@gluestack-ui/themed'; 
import '../../global.css';
import { ID, storage, client } from '../../lib/appwrite/appwrite.js';
import * as DocumentPicker from 'expo-document-picker';

const QuizHome = () => {
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const { PDF_BUCKET_ID, IP_ADDRESS } = getEnvVars();
    const bucketId = PDF_BUCKET_ID || '67bccd990005a5d175c4';
    
    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [quizData, setQuizData] = useState(null);
    const [generatingQuiz, setGeneratingQuiz] = useState(false);
  
    const toast = useToast();
  useEffect(() => {
      const checkConnection = async () => {
        try {
          // Try a lightweight ping request to Appwrite
          await client.account.createAnonymousSession();
          console.log("Successfully connected to Appwrite");
        } catch (error) {
          console.warn("Failed to connect to Appwrite:", error);
          Alert.alert(
            "Connection Issue", 
            "There might be a problem connecting to our servers. Make sure you're connected to the internet.",
            [{ text: "OK" }]
          );
        }
      };
      
      checkConnection();
    }, []);
    
    // Fetch file data using FileSystem for more reliable handling
    const getFileData = async (fileUri) => {
      try {
        // For iOS, we need to handle the file:// protocol
        let uri = fileUri;
        if (Platform.OS === 'ios' && !fileUri.startsWith('file://')) {
          uri = `file://${fileUri}`;
        }
        
        // Read the file as base64
        const base64Data = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        // Convert base64 to blob
        const byteArray = Buffer.from(base64Data, 'base64');
        const blob = new Blob([byteArray], { type: file.mimeType });
        
        return blob;
      } catch (error) {
        console.error("Error reading file:", error);
        throw new Error(`Failed to read file: ${error.message}`);
      }
    };
    
    
  
    const uploadFile = async () => {
      try {
        setUploading(true);
        setError(false);
        
        // Pick the document
        const result = await DocumentPicker.getDocumentAsync({
          type: 'application/pdf',
          copyToCacheDirectory: true,
        });
        
        if (result.canceled) {
          setUploading(false);
          return;
        }
        
        const selectedFile = result.assets[0];
        console.log("Selected file:", selectedFile);
        setFile(selectedFile);
        
        // Check file size
        if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
          Alert.alert('File Too Large', 'Please select a file smaller than 10MB.');
          setUploading(false);
          return;
        }
  
        // Use direct upload with formData approach
        const uri = selectedFile.uri;
        const filename = selectedFile.name;
        const fileId = ID.unique();
        
        // Create FormData object - this works better cross-platform
        const formData = new FormData();
        formData.append('file', {
          uri,
          name: filename,
          type: selectedFile.mimeType || 'application/pdf'
        });
        
        
        // Get the Appwrite endpoint and project ID
        const endpoint = "https://cloud.appwrite.io/v1";
        const projectId = "67bcccfe0010a29974a4";
        
        // Create headers with the correct authentication
        const headers = {
          'Content-Type': 'multipart/form-data',
          'X-Appwrite-Project': projectId,
        };
        
        // Add the API key if available
        // if (client.config.key) {
        //   headers['X-Appwrite-Key'] = client.config.key;
        // }
        
        // Direct upload using axios with formData
        const uploadUrl = `${endpoint}/storage/buckets/${bucketId}/files`;
  
  // Create a FormData object that includes the fileId
        const form = new FormData();
        form.append('fileId', fileId);
        form.append('file', {
          uri,
          name: filename,
          type: selectedFile.mimeType || 'application/pdf'
        });
  
        // Make the request
        const uploadResponse = await axios.post(uploadUrl, form, { 
          headers
        });
        console.log('Upload response:', uploadResponse.data);
        
        // Set the file URL
        const fileURL = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
        console.log("File URL set:", fileURL);
        setFileURL(fileURL);
        
        toast.show({
          render: () => {
            return (
              <Toast action="success">
                <VStack space="xs">
                  <ToastDescription>File uploaded successfully</ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      } catch (error) {
        console.error("File Upload Error:", error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
        setError(true);
        Alert.alert(
          'Upload Error', 
          `An error occurred: ${error.message || 'Unknown error'}. Please try again.`
        );
      } finally {
        setUploading(false);
      }
    };
  
    const generateQuiz = async () => {
      if (!fileURL) {
        toast.show({
          render: () => {
            return (
              <Toast action="error">
                <VStack space="xs">
                  <ToastDescription>Please upload a PDF file first</ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
        return;
      }
      
      try {
        setGeneratingQuiz(true);
        
        // Call your API with the PDF URL
        console.log("Generating quiz for:", fileURL);
        
        // Replace with your actual API endpoint for quiz generation
        fetch('http://192.168.68.18:5000/api/quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pdf_url: fileURL
          })
        }).then((response) => response.json())
          .then((data) => {
            setQuizData(data);
            console.log('API response:', data);
            router.push({
              pathname: './quizscreen',
              params: { data: JSON.stringify(data.response) }
            });
          }).catch((error) => {
            console.error("Error generating quiz:", error);
            toast.show({
              render: () => {
                return (
                  <Toast action="error">
                    <VStack space="xs">
                      <ToastDescription>Failed to generate quiz. Please try again.</ToastDescription>
                    </VStack>
                  </Toast>
                );
              },
            });
          }).finally(() => {
            setGeneratingQuiz(false);
          });
        
      } catch (error) {
        console.error("Error generating quiz:", error);
        toast.show({
          render: () => {
            return (
              <Toast action="error">
                <VStack space="xs">
                  <ToastDescription>Failed to generate quiz. Please try again.</ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
        setGeneratingQuiz(false);
      }
    };
  
  return (
    <SafeAreaView  
      style={styles.container} 
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headertitle}>Select Materials for Your Quiz</Text>
        <Text style={styles.subtitle}>Pick the study materials you'd like to be quizzed on.</Text>
      </View>

      <View style={styles.container2}>
        <TouchableOpacity onPress={uploadFile} disabled={uploading}>
          <View style={[styles.box, uploading && styles.disabledBox]}>
            <Image source={scan} style={{ width: 44, height: 44, marginRight: 5 }} />
            <Text>Upload PDF</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Show file name if uploaded */}
      {file && (
        <View style={styles.fileInfo}>
          <Text style={styles.fileName}>File: {file.name}</Text>
        </View>
      )}

      {/* Generate Quiz Button - Show when file is uploaded */}
      {fileURL && (
        <TouchableOpacity 
          style={[styles.startQuizButton, generatingQuiz && styles.disabledButton]} 
          onPress={generateQuiz}
          disabled={generatingQuiz}
        >
          {generatingQuiz ? (
            <View style={styles.buttonContent}>
              <Spinner size="small" color="white" />
              <Text style={styles.startQuizText}>Generating Quiz...</Text>
            </View>
          ) : (
            <Text style={styles.startQuizText}>Generate Quiz</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Tip: Upload your study materials to create a personalized quiz!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems:'center'
  },
  headertitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0504aa',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  selectedComponent: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 1, // Lower zIndex for this component
  },
  componentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0504aa',
    marginBottom: 10,
  },
  componentText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#0504aa',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  materialList: {
    maxHeight: 300,
    width: '100%',
  },
  materialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  materialText: {
    fontSize: 18,
    color: '#0504aa',
    marginLeft: 15,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#0504aa',
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    borderColor: '#0504aa',
  },
  startQuizButton: {
    marginTop: 20,
    backgroundColor: '#0504aa',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  startQuizText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  container2: {
    flexDirection: 'column',
    gap: 20,
    marginVertical: 20,
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 7,
    borderColor: 'rgb(183, 203, 226)',
    padding: 20,
    minWidth: '100%',
    gap: 10,
  },
  disabledBox: {
    opacity: 0.6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  disabledButton: {
    backgroundColor: '#8585d0',
  },
  fileInfo: {
    backgroundColor: '#e6f7ff',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  fileName: {
    fontSize: 16,
    color: '#0504aa',
  },
});

export default QuizHome;