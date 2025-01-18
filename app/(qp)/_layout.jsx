import React from 'react';
import { Slot, useNavigation } from 'expo-router';
import { TouchableOpacity, Text, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const Layout = () => {
  const navigation = useNavigation();

  // Function to handle file upload
  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        Alert.alert('Upload Successful', `You uploaded: ${result.name}`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading the document.');
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'PYQ', // Set the header title
      headerStyle: {
        backgroundColor: '#ffffff', // Background color of the header
      },
      headerTintColor: 'black', // Color of the title and back button
      headerRight: () => (
        <TouchableOpacity onPress={handleUpload} style={{ marginRight: 15 }}>
          <Text style={{ fontSize: 28, color: 'black' }}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return <Slot />;
};

export default Layout;
