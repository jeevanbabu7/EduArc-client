import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Image, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { AvatarImage, Button, ButtonText, Spinner } from "@gluestack-ui/themed";
import { useToast, Toast, ToastDescription } from '@gluestack-ui/themed'; 
import '../global.css';
import { ID, storage, client } from '../lib/appwrite/appwrite.js';
import getEnvVars from '../config.js';
import scan from '../assets/icons/scanold.png';
import upload from '../assets/icons/upload_new.png';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Box, Heading, HStack, VStack, Avatar, FlatList } from '@gluestack-ui/themed';
import {useUser} from '../context/userContext.jsx';


const Summarise = () => {
  const { PDF_BUCKET_ID, IP_ADDRESS } = getEnvVars();
  const bucketId = PDF_BUCKET_ID || '67bccd990005a5d175c4';
  const windowWidth = Dimensions.get('window').width;
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const {currentUser} = useUser()
  // console.log("User:", currentUser);
  

  const [summaryHistory, setSummaryHistory] = useState([
    { id: 1, summary: "This is a summary of the first document" },
    { id: 2, summary: "This is a summary of the second document" },
    { id: 3, summary: "This is a summary of the third document" },
    { id: 4, summary: "This is a summary of the fourth document" },
    { id: 5, summary: "This is a summary of the fifth document" },
    { id: 6, summary: "This is a summary of the sixth document" },
    { id: 7, summary: "This is a summary of the seventh document" },
    { id: 8, summary: "This is a summary of the eighth document" },
    { id: 9, summary: "This is a summary of the ninth document" },
    { id: 10, summary: "This is a summary of the tenth document" },
  ]);
  const toast = useToast();
  
  // Check connection to Appwrite on component mount
  // useEffect(() => {
  //   const checkConnection = async () => {
  //     try {
  //       // Try a lightweight ping request to Appwrite
  //       await client.account.createAnonymousSession();
  //       console.log("Successfully connected to Appwrite");
  //     } catch (error) {
  //       console.warn("Failed to connect to Appwrite:", error);
  //       Alert.alert(
  //         "Connection Issue", 
  //         "There might be a problem connecting to our servers. Make sure you're connected to the internet.",
  //         [{ text: "OK" }]
  //       );
  //     }
  //   };
    
  //   checkConnection();
  // }, []);

  useEffect(() => {
    const getSummaryHistory = async () => {
      try {
        // Fetch summary history from the API
        const response = await axios.get(`${IP_ADDRESS}:3000/api/summary/get-summary-history/${currentUser.$id}`);
        console.log("Summary history response:", response.data.summaries);
        setSummaryHistory(response.data.summaries);
      } catch (error) {
        console.error("Summary History Error:", error);
        Alert.alert('Error', `Failed to fetch summary history: ${error.message}`);
    }
  }
    getSummaryHistory();
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

  // Update uploadVideo with similar approach
  const uploadVideo = async () => {
    try {
      setUploading(true);
      setError(false);
      
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });
  
      if (result.canceled) {
        setUploading(false);
        return;
      }
      
      const selectedFile = result.assets[0];
      console.log("Selected video:", selectedFile);
      setFile(selectedFile);
      
      // Check file size
      if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
        Alert.alert('File Too Large', 'Please select a video smaller than 50MB.');
        setUploading(false);
        return;
      }

      // Use the same FormData approach as in uploadFile
      const uri = selectedFile.uri;
      const filename = selectedFile.name;
      const fileId = ID.unique();
      
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: filename,
        type: selectedFile.mimeType || 'video/mp4'
      });
      
      const endpoint = client.config.endpoint;
      const projectId = client.config.project;
      
      const headers = {
        'Content-Type': 'multipart/form-data',
        'X-Appwrite-Project': projectId,
      };
      
      if (client.config.key) {
        headers['X-Appwrite-Key'] = client.config.key;
      }
      
      const uploadUrl = `${endpoint}/storage/buckets/${bucketId}/files`;
      
      const uploadResponse = await axios.post(uploadUrl, formData, { 
        headers,
        params: {
          fileId: fileId
        }
      });
      
      console.log('Upload response:', uploadResponse.data);
      
      const videoURL = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
      console.log("Video URL set:", videoURL);
      setFileURL(videoURL);
      
      toast.show({
        render: () => {
          return (
            <Toast action="success">
              <VStack space="xs">
                <ToastDescription>Video uploaded successfully</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    } catch (error) {
      console.error('Video Upload Error:', error);
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
  
  const generateSummary = async () => {
    if (!fileURL) {
      Alert.alert('Error', 'No file URL available. Please upload a file first.');
      return;
    }
    
    try {
      setLoading(true);
      
      console.log(`Sending request to: ${IP_ADDRESS}/api/summary/pdf`);
      console.log(`With payload: ${JSON.stringify({ pdf_url: fileURL })}`);
      
      const result = await fetch(`http://192.168.1.4:5000/api/summary/pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdf_url: fileURL }),
      });

      if (!result.ok) {
        const errorText = await result.text();
        throw new Error(`Server responded with ${result.status}: ${errorText}`);
      }

      const data = await result.json();
      console.log("Summary response:", data);
      console.log("Summary response type:", data);
      
      
      axios.post(`${IP_ADDRESS}:3000/api/summary/new-summary`, {
        summary: data.response,
      }).then((response) => {
        setSummary(response.response);
      }).catch((error) => {
        console.log(error);
      });
      
      if (!data.response || !Array.isArray(data.response)) {
        throw new Error('Invalid response format from server');
      }
      
      setSummary(data.response);
    } catch (err) {
      console.error("Summary Generation Error:", err);
      Alert.alert('Error', `Failed to generate summary: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  console.log("Summary History:", summaryHistory);
  
  
  return (
    <SafeAreaView style={{ flex: 1, overflow: "scroll" }}>
      <ScrollView
        contentContainerStyle={{ ...styles.container, flexGrow: 1, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {!file && (<Text style={styles.title}>Upload a File</Text>)}

        {!file && (
          <View style={styles.container2}>
            <TouchableOpacity onPress={uploadFile} disabled={uploading}>
              <View style={[styles.box, uploading && styles.disabledBox]}>
                <Image source={scan} style={{ width: 44, height: 44, marginRight: 5 }} />
                <Text>Upload PDF</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={uploadVideo} disabled={uploading}>
              <View style={[styles.box, uploading && styles.disabledBox]}>
                <Image source={upload} style={{ width: 50, height: 50, marginRight: 5 }} />
                <Text>Upload Video</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {uploading && (
          <View style={styles.loadingContainer}>
            <Spinner size="large" color="$indigo600" />
            <Text style={styles.loadingText}>Uploading file...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              There was a problem with the upload. Please try again.
            </Text>
            <TouchableOpacity 
              style={[styles.button, styles.retryButton]} 
              onPress={() => {
                setError(false);
                setFile(null);
              }}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {(file && !summary && !uploading && !error) && (
          <View style={styles.fileContainer}>
            <Text style={styles.fileTitle}>Selected File:</Text>
            <Text style={styles.fileName}>{file.name}</Text>
            {fileURL ? (
              <Text style={styles.fileReady}>File uploaded and ready for processing</Text>
            ) : (
              <Text style={styles.fileWaiting}>Preparing file...</Text>
            )}
          </View>
        )}

        {(file && fileURL && !summary && !loading && !uploading && !error) && (
          <TouchableOpacity style={[styles.button, styles.shadow]} onPress={generateSummary}>
            <Text style={styles.buttonText}>Generate Summary</Text>
          </TouchableOpacity>
        )}

        {summary && summary.length > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.title}>Summary</Text>
            {summary.map((item, index) => (
              <View key={index} style={styles.summaryItem}>
                <Text style={styles.summaryHeading}>{item.title}</Text>
                <Text style={styles.summaryText}>{item.content}</Text>
              </View>
            ))}
          </View>
        )}

        {!file && !uploading && !error && (
          <Text style={styles.subtitle}>
            Upload a PDF or video file, and we'll summarize it for you.
          </Text>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <Spinner size="large" color="$indigo600" />
            <Text style={styles.loadingText}>Generating summary...</Text>
          </View>
        )}

        {/* Responsive Summary History Section */}
        {summaryHistory && (
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Summary History</Text>
            <View style={styles.historyContainer}>
              {/* For larger screens, use a grid layout */}
              {windowWidth >= 768 ? (
                <FlatList
                  data={summaryHistory} // Show only the first 4 items
                  keyExtractor={(item) => item._id}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <View style={styles.gridItem}>
                      <TouchableOpacity style={styles.historyCard}>
                        <Text style={styles.summaryHeading}>Summary {item._id}</Text>
                        {/* <Text 
                          style={styles.summaryText}
                          numberOfLines={3}
                          ellipsizeMode="tail"
                        >
                          {item.summary}
                        </Text> */}
                      </TouchableOpacity>
                    </View>
                  )}
                  contentContainerStyle={styles.gridContainer}
                />
              ) : (
                // For mobile screens, use horizontal scrolling
                <FlatList
                  data={summaryHistory} // Show only the first 4 items
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View style={styles.gridItem}>
                      <TouchableOpacity style={styles.historyCard}>
                        <Text style={styles.summaryHeading}>Summary {item._id}</Text>
                        {/* <Text 
                          style={styles.summaryText}
                          numberOfLines={3}
                          ellipsizeMode="tail"
                        >
                          {item.summary}
                        </Text> */}
                      </TouchableOpacity>
                    </View>
                  )}
                  contentContainerStyle={styles.gridContainer}
                />
              )}
            </View>
            
            {/* View All Button */}
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    padding: 20,
    alignItems: 'center',
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
    borderColor: '#D3D3D3',
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
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 30,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0504aa',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  retryButton: {
    backgroundColor: '#e74c3c',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  fileContainer: {
    marginTop: 30,
    width: '100%',
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 15,
    alignItems: 'center',
  },
  fileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  fileName: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 10,
  },
  fileReady: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '500',
  },
  fileWaiting: {
    fontSize: 14,
    color: '#e67e22',
    fontWeight: '500',
  },
  summaryContainer: {
    marginTop: 20,
    width: '100%',
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 15,
  },
  summaryItem: {
    marginBottom: 20,
  },
  summaryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  summaryText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
  errorContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fef3f2',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f87171',
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  summaryBox: {
    marginTop: 20,
    width: '100%',
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 15,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  historyContainer: {
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '50%',
    padding: 5,
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    marginBottom: 10,
    minWidth: 250,
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  viewAllButton: {
    marginTop: 15,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#0504aa',
    borderRadius: 20,
  },
  viewAllText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15, 
  },
});
export default Summarise;