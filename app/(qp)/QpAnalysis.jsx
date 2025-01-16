import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const QpAnalysis = () => {
  const [file, setFile] = useState(null);

  const pyqs = [
    'PYQ 2021 - Mathematics',
    'PYQ 2021 - Physics',
    'PYQ 2021 - Chemistry',
    'PYQ 2020 - Mathematics',
    'PYQ 2020 - Physics',
    'PYQ 2020 - Physics',
    'PYQ 2020 - Physics',
  ];

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setFile(result);
        Alert.alert('Upload Successful', `You uploaded: ${result.name}`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading the document.');
    }
  };

  const handleAnalysis = () => {
    if (!file) {
      Alert.alert('No Document Uploaded', 'Please upload a document before proceeding to analysis.');
      return;
    }
    // Placeholder for analysis functionality
    alert('Analysis will include important PYQs, weightage, and frequently asked questions.');
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.listWrapper}>
          <ScrollView style={styles.listContainer}>
            {pyqs.map((pyq, index) => (
              <View key={index} style={styles.card}>
                <FontAwesome name="book" size={20} color="#0504aa" style={styles.cardIcon} />
                <Text style={styles.cardText}>{pyq}</Text>
                <Ionicons name="ellipsis-vertical" size={20} color="#0504aa" style={styles.cardIcon} />
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        {file && <Text style={styles.fileName}>Uploaded File: {file.name}</Text>}
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.analysisTitle}>Get Analysis</Text>
        <Text style={styles.description}>
          The analysis will include:
          {'\n'}- Important PYQs
          {'\n'}- Weightage of topics
          {'\n'}- Frequently asked questions (FAQs)
        </Text>
        <TouchableOpacity style={styles.analysisButton} onPress={handleAnalysis}>
          <Text style={styles.analysisButtonText}>Proceed to Analysis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  topSection: {
    flex: 2,
    backgroundColor: '#f0f2ff',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  listWrapper: {
    flex: 1,
    position: 'relative',
  },
  listContainer: {
    borderRadius: 4,
    flexGrow: 0,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f2ff',
    padding: 15,
    alignItems: 'center',
    borderColor: '#b5cde0',
    borderBottomWidth: 1,
  },
  cardText: {
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 10,
    flex: 1, // Ensure text takes up available space
  },
  cardIcon: {
    padding: 5,
  },
  uploadButton: {
    position: 'absolute',
    bottom: 10,
    right: 40,
    backgroundColor: '#0504aa',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  fileName: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 10,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#ffff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  analysisTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  analysisButton: {
    backgroundColor: '#0504aa',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
  },
  analysisButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QpAnalysis;
