import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import MaterialCard from '../../components/MaterialCard';
import { useRouter } from 'expo-router';

function Materials() {
  const handleUpload = () => {
    Alert.alert('Upload File', 'File upload functionality will be implemented here.');
    // Add logic for uploading files here
    //save materials locally for each course in different folders and render it here 
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={[
          { key: 'Question Paper 1' },
          { key: 'Question Paper 2' },
          { key: 'Question Paper 3' },
          { key: 'Question Paper 4' },
          { key: 'Question Paper 5' },
          { key: 'Question Paper 6' },
          { key: 'Question Paper 7' },
        ]}
        renderItem={({ item }) => (
          <MaterialCard
            title={item.key}
            onPress={null}
          />
        )}
        keyExtractor={(item) => item.key}
      />

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>Upload File</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Materials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Light background color
  },
  uploadButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#0504aa', // Blue button color
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
