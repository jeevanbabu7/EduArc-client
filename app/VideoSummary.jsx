import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const VideoSummary = () => {
  const [file, setFile] = useState(null);

  // Function to pick a video file
  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*', // Accept video files
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setFile(result);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while picking the video file.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload a Video to Summarise</Text>
      <Text style={styles.subtitle}>
        Upload a video file, and we’ll summarise it for you.
      </Text>

      <TouchableOpacity style={[styles.button, styles.shadow]} onPress={uploadFile}>
        <Text style={styles.buttonText}>Upload Video</Text>
      </TouchableOpacity>

      {file && (
        <View style={styles.fileContainer}>
          <Text style={styles.fileTitle}>Uploaded Video:</Text>
          <Text style={styles.fileName}>{file.name}</Text>
        </View>
      )}
    </View>
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
});

export default VideoSummary;
