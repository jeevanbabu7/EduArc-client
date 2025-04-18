import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import camera from '../assets/icons/camera.png'
import gallery from '../assets/icons/gallery.png'

const Upload = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Allow gallery access to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const captureImage = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Allow camera access to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {!image && (<Text style={styles.title}>Upload or Scan Image</Text>)}
      {!image && (<View style={styles.container2}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.box}>
            <Image source={gallery} style={{ width: 44, height: 44, marginRight:5 }} />
            <Text >Upload from Gallery</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={captureImage}>
          <View style={styles.box}>
            <Image source={camera} style={{ width: 44, height: 44, marginRight: 5 }} />
            <Text>Capture from Camera</Text>
          </View>
        </TouchableOpacity>
      </View>)}

      {!image && (<Text style={styles.subtitle}>
        Choose an option to upload an image from your gallery or capture one using the camera.
      </Text>)}

      {image && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Image Preview:</Text>
          <Image source={{ uri: image }} style={styles.imagePreview} />
        </View>
      )}
      {image && (<TouchableOpacity style={[styles.button, styles.shadow]} onPress={null}>
          <Text style={styles.buttonText}>Analyse</Text>
        </TouchableOpacity>)}
    </View>
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
    gap:20
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
  title: {
    fontSize: 28,
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
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15, // Space between buttons
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
  previewContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 15,
    padding: 15,
  },
  previewText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  imagePreview: {
    width: 250,
    height: 250,
    borderRadius: 15,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
});

export default Upload;
