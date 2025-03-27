import React, { useState,useRef,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Platform,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import scan from '../../assets/icons/scanold.png';
import cards from '../../assets/icons/cards.png';
import menu from '../../assets/icons/hamburger-icon.png';
import arrowup from '../../assets/icons/arrowup.png';
import RBSheet from 'react-native-raw-bottom-sheet';
import getEnvVars from '../../config.js';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Button, ButtonText, Spinner } from "@gluestack-ui/themed";
import { useToast, Toast, VStack, ToastDescription } from '@gluestack-ui/themed'; 
import '../../global.css';
import { ID, storage, client } from '../../lib/appwrite/appwrite.js';
import * as DocumentPicker from 'expo-document-picker';
const CustomCheckbox = ({ isChecked, onToggle }) => (
  <TouchableOpacity onPress={onToggle} style={[styles.checkboxContainer, isChecked && styles.checked]}>
    {isChecked && <Ionicons name="checkmark" size={20} color="#0504aa" />}
  </TouchableOpacity>
);

const FlashHome = () => {
  const refRBSheet = useRef(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  
  const dummy_flashcards = [
    { id: '1', title: 'New Course Added', message: 'You have a new course available: React Native Basics' },
    { id: '2', title: 'Assignment Due', message: 'Your "Data Structures" assignment is due tomorrow.' },
    { id: '3', title: 'Live Class Reminder', message: 'Join the live class for "Machine Learning" at 5 PM today.' },
    { id: '4', title: 'Profile Update', message: 'Your profile details were successfully updated.' },
  ];
  const toggleSelection = (id) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((topicId) => topicId !== id) : [...prev, id]
    );
  };
  const { PDF_BUCKET_ID, IP_ADDRESS } = getEnvVars();
      const bucketId = PDF_BUCKET_ID || '67bccd990005a5d175c4';
      
      const [file, setFile] = useState(null);
      const [fileURL, setFileURL] = useState(null);
      const [uploading, setUploading] = useState(false);
      const [error, setError] = useState(false);
      const [loading, setLoading] = useState(false);
      const [summary, setSummary] = useState(null);
      const [retryCount, setRetryCount] = useState(0);
      const [flashcardData, setFlashcardData] = useState(null);
      const [generatingFlashcards, setGeneratingFlashcards] = useState(false);

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

      const generateFlashcards = async () => {
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
          setGeneratingFlashcards(true);
          
          // Call your API with the PDF URL
          console.log("Generating flashcards for:", fileURL);
          
          fetch('http://172.16.32.194:5000/api/quiz', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pdf_url: fileURL
          })}).then((response) => {
            setFlashcardData(response.data);
            console.log('API response:', responsex);
            router.push({
              pathname: './flashcardscreen',
              params: { data: JSON.stringify(response.data) }
            });
          }).catch((error) => {
            console.error("Error generating flashcards:", error);
          });
          
          // console.log('API response:', response.data);
          // setFlashcardData(response.data);
          
          // Navigate to flashcard screen with the data
          
          
        } catch (error) {
          console.error("Error generating flashcards:", error);
          toast.show({
            render: () => {
              return (
                <Toast action="error">
                  <VStack space="xs">
                    <ToastDescription>Failed to generate flashcards. Please try again.</ToastDescription>
                  </VStack>
                </Toast>
              );
            },
          });
        } finally {
          setGeneratingFlashcards(false);
        }
      };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Choose Content to generate FlashCards</Text>
        <Text style={styles.subtitle}>
          Select topics to customize your experience. Ready to test your knowledge?
        </Text>
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
      
      {/* Generate Button - Show when file is uploaded */}
      {fileURL && (
        <TouchableOpacity 
          style={[styles.startQuizButton, generatingFlashcards && styles.disabledButton]} 
          onPress={generateFlashcards}
          disabled={generatingFlashcards}
        >
          {generatingFlashcards ? (
            <View style={styles.buttonContent}>
              <Spinner size="small" color="white" />
              <Text style={styles.startQuizText}>Generating...</Text>
            </View>
          ) : (
            <Text style={styles.startQuizText}>Generate Flash Cards</Text>
          )}
        </TouchableOpacity>
      )}
      
      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Tip: You can select multiple topics for broader learning!</Text>
      </View>

      {/* Bottom sheet only shows when no file is uploaded */}
      {!fileURL && (
        <>
          <TouchableOpacity style={styles.bottomsheetbutton} onPress={() => refRBSheet.current.open()}>
            <Image source={menu} style={{ width: 24, height: 24 }} />
            <Text style={{fontSize: 18,fontWeight: 'bold'}}>Show Saved FlashCards</Text>
            <Image source={arrowup} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>

          <RBSheet
                  ref={refRBSheet}
                  draggable={false} // Changed to false to remove the notch
                  closeOnPressMask={true}
                  closeOnPressBack={true}
                  customStyles={{
                    wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' },
                    container: {
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      padding: 0, // Removed padding to allow header to sit at the top
                      backgroundColor: '#fff',
                      height: '75%',
                    },
                    // Removed draggableIcon style since we're not using it anymore
                  }}
                >
                  <Text style={styles.savedFlashcard}>Saved FlashCards</Text>
                  <FlatList
                    data={dummy_flashcards}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.notificationItem} >
                        <Image source={cards} style={{height:24,width:24,marginRight:20}}></Image>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                      </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContainer}
                  />
                </RBSheet>
        </>
        

      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
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
  listContainer: {
    flex: 1,
    width: '100%',
  },
  topicContainer: {
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
  topicText: {
    fontSize: 18,
    color: '#0504aa',
    marginLeft: 15, // More space after the icon
  },
  checkboxContainer: {
    width: 26,
    height: 26,
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
  bottomsheetbutton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap:10,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%', // Keeps button width balanced
    position: 'absolute',
    bottom: 30, // Positioned better at the bottom
    alignSelf: 'center',
    borderWidth:1,
    borderColor:'rgb(183, 203, 226)'
  },
  
  
  savedFlashcard: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical:20,
    borderBottomWidth:1,
    borderColor:'#d1d5db'
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notificationItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight:500
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  disabledButton: {
    backgroundColor: '#8585d0',
  },
});

export default FlashHome;
