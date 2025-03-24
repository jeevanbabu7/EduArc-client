import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView,Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ButtonText, Input } from '@gluestack-ui/themed';
import { InputField } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';
import { IP_ADDRESS,COLLEGE_IP_ADDRESS, PORT } from 'expo-constants';
import upload from '../assets/icons/upload_new.png'
import up from '../assets/icons/up.png'


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
    <Text style={styles.title}>Upload a Video</Text>
    <View style={styles.container2}>
        <View style={styles.box}>
          <TouchableOpacity style={styles.box1} onPress={uploadFile}>
            <Image source={upload} style={{ width: 50, height: 50, marginRight: 5 }} />
            <Text>Upload video</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Input variant="outline" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} style={styles.inputField}>
              <InputField 
                placeholder="Video url here.." 
                value={videoURL} 
                onChangeText={handleChange} 
              />
            </Input>
            <TouchableOpacity style={styles.submitButton} onPress={handleSend}>
              <Image source={up} style={styles.upButton}/>
            </TouchableOpacity>
          </View>
        </View>
    </View>


    {/* <Text style={{ marginTop: 20, ...styles.subtitle }}>or</Text> */}

    

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
    <Text style={styles.subtitle}>
      Upload a video file, and we’ll summarise it for you.
    </Text>
  </View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    padding: 20,
    alignItems: 'center',
  },
  container2:{
    gap: 20,
    
  },
  box: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 7,
    borderColor: 'rgb(183, 203, 226)',  // Use borderColor instead of bordercolor
    padding: 20,
    minWidth:'100%',
    gap:10
  },
  box1: {
    alignItems: 'center',
    padding: 20,
    minWidth:'100%',
    gap:10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    marginTop:10,
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
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
    width: '100%',
  },
  inputField: {
    width: '80%',
    borderRadius:0,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
  }, 
  
  submitButton: {
    width: '20%',
    paddingVertical: 10,
    // borderRadius: 15,
    backgroundColor: '#0504aa',
    alignItems:'center',
    borderTopRightRadius:10,
    borderBottomRightRadius:10

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
  upButton:{
    height:24,
    width:24
  }
});

export default VideoSummary;
