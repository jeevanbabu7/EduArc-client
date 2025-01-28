import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ButtonText, Input } from '@gluestack-ui/themed';
import { InputField } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';
import { IP_ADDRESS,COLLEGE_IP_ADDRESS, PORT } from '@env';

const VideoSummary = () => {
  const [file, setFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [videoSummary, setVideoSummary] = useState([]);

  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setFile(result);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while picking the video file.');
    }
  };

  const handleChange = (text) => {
    setVideoURL(text);
  };

  const handleSend = async () => {
    try {
      if (videoURL == "") {
        Alert.alert('Error', 'Please enter a valid URL.');
        return;
      }

      const response = await fetch(`http://192.168.90.18:${PORT}/api/summary/video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url : videoURL, 'output_file_name': 'output' }),
      });

      const data = await response.json();
      setVideoSummary(() => {
        if(data.ok == true) {
          return data.response;
        }
        return [];
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
  <View style={styles.container}>
    <Text style={styles.title}>Upload a Video to Summarise</Text>
    <Text style={styles.subtitle}>
      Upload a video file, and we’ll summarise it for you.
    </Text>

    <TouchableOpacity style={[styles.button, styles.shadow]} onPress={uploadFile}>
      <Text style={styles.buttonText}>Upload Video</Text>
    </TouchableOpacity>

    <Text style={{ marginTop: 20, ...styles.subtitle }}>or</Text>

    <View style={styles.inputContainer}>
      <Input variant="outline" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} style={styles.inputField}>
        <InputField 
          placeholder="Video url here.." 
          value={videoURL} 
          onChangeText={handleChange} 
        />
      </Input>
      <Button style={styles.submitButton} onPress={handleSend}>
        <ButtonText>Send</ButtonText>
      </Button>
    </View>

    {videoSummary.length > 0 && (
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Video Summary</Text>
        {videoSummary.map((item, index) => (
          <View key={index} style={styles.summaryItem}>
            <Text style={styles.summaryHeading}>{item.heading}</Text>
            <Text style={styles.summaryText}>{item.summary}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
</ScrollView>
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
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  inputField: {
    width: '70%',
    marginRight: 10,
  },
  submitButton: {
    width: '30%',
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: '#282a2d',
  },
  summaryContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    overflow: 'scroll',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  summaryItem: {
    marginBottom: 15,
  },
  summaryHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  summaryText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,  // Adjust as needed
  },
  
});

export default VideoSummary;
