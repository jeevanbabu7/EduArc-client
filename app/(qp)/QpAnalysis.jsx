import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const QpAnalysis = () => {
  const handleAnalysis = () => {
    // Placeholder for analysis functionality
    alert('Analysis will include important PYQs, weightage, and frequently asked questions.');
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: '#ffff',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#f0f2ff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation:20

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
  nocontent:{
    
  }
});

export default QpAnalysis;
