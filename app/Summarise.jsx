import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'; // import SafeAreaView from safe-area-context
import * as DocumentPicker from 'expo-document-picker';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import app from '../firebase.js';
import { IP_ADDRESS, PORT } from '@env';
import { Button, ButtonText, Spinner } from "@gluestack-ui/themed";
import { useToast, Toast, VStack, ToastDescription } from '@gluestack-ui/themed'; 
import '../global.css'
const Summarise = () => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const toast = useToast();

  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      }
      await storeFileInFirebase();
    } catch (error) {
      Alert.alert('Error', 'An error occurred while picking the file.');
    }
  };

  const generateSummary = async () => {
    try {
      setLoading(true);
      const result = await fetch(`${IP_ADDRESS}:${PORT}/api/summary/pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdf_url: fileURL }),
      });

      const data = await result.json();
      setSummary(data.response);
      setLoading(false);
    } catch (err) {
      Alert.alert('Error', 'An error occurred while generating the summary.');
    }
  };

  const storeFileInFirebase = async () => {
    if (!file) {
      setError(true);
      Alert.alert("Error", "Please select a file first.");
      return;
    }

    setUploading(true);
    const response = await fetch(file.uri);
    const blob = await response.blob();

    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, `uploads/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        setUploading(false);
        Alert.alert('Upload failed', error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileURL(downloadURL);
          setUploading(false);
          Alert.alert('Success', 'File uploaded successfully!');
        });
      }
    );

    return;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, overflow: 'scroll' }}>
        <ScrollView
          contentContainerStyle={[styles.container, { alignItems: 'center', flexGrow: 1, overflow: 'scroll',paddingBottom: 50 }]} // Ensure content grows
        >
          <Text style={styles.title}>Upload a Document to Summarise</Text>
          <Text style={styles.subtitle}>
            Upload a PDF or document file, and we’ll summarise it for you.
          </Text>

          <TouchableOpacity style={[styles.button, styles.shadow]} onPress={uploadFile}>
            <Text style={styles.buttonText}>Select Document</Text>
          </TouchableOpacity>

          {(file && !summary) && (
            <View style={styles.fileContainer}>
              <Text style={styles.fileTitle}>Selected File:</Text>
              <Text style={styles.fileName}>{file.name}</Text>
            </View>
          )}

          {(file && !summary && !loading) && (
            <TouchableOpacity style={[styles.button, styles.shadow]} onPress={generateSummary}>
              <Text style={styles.buttonText}>Generate Summary</Text>
            </TouchableOpacity>
          )}

          {summary && summary.length > 0 && (
            <View style={styles.summaryContainer}>
              <Text style={styles.title}>Summary</Text>
              {summary.map((item, index) => (
                <View key={index} style={styles.summaryItem}>
                  <Text style={styles.summaryHeading}>{item.heading}</Text>
                  <Text style={styles.summaryText}>{item.summary}</Text>
                </View>
              ))}
            </View>
          )}

          {loading && (
            <View className="w-full p-15 flex flex-col justify-center items-center" sty>
              <Spinner size="large" color="$indigo600" />
              <Text className="text-lg text-slate-700">Loading</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#0504aa',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
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
});

export default Summarise;
