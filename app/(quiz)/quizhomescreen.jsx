import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
const CustomCheckbox = ({ isChecked, onToggle }) => (
  <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
    <View style={[styles.checkbox, isChecked && styles.checked]} />
  </TouchableOpacity>
);

const QuizHome = () => {
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
        {/* <Image
          source={{ uri: 'https://example.com/quiz-icon.png' }} // Replace with your image URL
          style={styles.headerImage}
        /> */}
        <Text style={styles.title}>Choose Content for Your Quiz</Text>
        <Text style={styles.subtitle}>
          Select topics to customize your quiz experience. Ready to test your knowledge?
        </Text>
      </View>           

      {/* Topics Section */}
      <View style={styles.transparentView}>
        {topics.map((topic) => (
          <View key={topic.id} style={styles.topicContainer}>
            <CustomCheckbox
              isChecked={selectedTopics.includes(topic.id)}
              onToggle={() => toggleSelection(topic.id)}
            />
            <Text style={styles.topicText}>{topic.title}</Text>
          </View>
        ))}
        {selectedTopics.length > 0 && (
          <TouchableOpacity style={styles.startQuizButton} onPress={() => router.push('./quizscreen')}>
            <Text style={styles.startQuizText}>Start Quiz</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${selectedTopics.length * 25}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {selectedTopics.length} / {topics.length} Topics Selected
        </Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Tip: You can select multiple topics for a broader quiz!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2ff', // Light blue background
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
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
    marginBottom: 20,
  },
  transparentView: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  topicText: {
    fontSize: 18,
    color: '#0504aa',
    marginLeft: 10,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#0504aa',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: '80%',
    height: '80%',
  },
  checked: {
    backgroundColor: '#0504aa',
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

export default QuizHome;
