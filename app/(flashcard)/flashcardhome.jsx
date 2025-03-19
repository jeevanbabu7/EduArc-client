import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const CustomCheckbox = ({ isChecked, onToggle }) => (
  <TouchableOpacity onPress={onToggle} style={[styles.checkboxContainer, isChecked && styles.checked]}>
    {isChecked && <Ionicons name="checkmark" size={20} color="#0504aa" />}
  </TouchableOpacity>
);

const FlashHome = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const topics = [
    { id: '1', title: 'Math' },
    { id: '2', title: 'Science' },
    { id: '3', title: 'History' },
    { id: '4', title: 'Technology' },
  ];
  
  const toggleSelection = (id) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((topicId) => topicId !== id) : [...prev, id]
    );
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

      {/* Topics List */}
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.topicContainer}>
            <CustomCheckbox
              isChecked={selectedTopics.includes(item.id)}
              onToggle={() => toggleSelection(item.id)}
            />
            <Text style={styles.topicText}>{item.title}</Text>
          </View>
        )}
      />

      {/* Generate Button */}
      {selectedTopics.length > 0 && (
        <TouchableOpacity style={styles.startQuizButton} onPress={() => router.push('./flashcardscreen')}>
          <Text style={styles.startQuizText}>Generate</Text>
        </TouchableOpacity>
      )}

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(selectedTopics.length / topics.length) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {selectedTopics.length} / {topics.length} Topics Selected
        </Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Tip: You can select multiple topics for broader learning!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2ff',
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
  progressBarContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0504aa',
  },
  progressText: {
    marginTop: 5,
    color: '#0504aa',
    fontSize: 14,
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
});

export default FlashHome;
