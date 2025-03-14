import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const CustomCheckbox = ({ isChecked, onToggle }) => (
  <TouchableOpacity onPress={onToggle} style={[styles.checkboxContainer, isChecked && styles.checked]}>
    {isChecked && <Ionicons name="checkmark" size={18} color="#0504aa" />}
  </TouchableOpacity>
);

const QuizHome = () => {
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  // Dummy list of materials (replace with actual data)
  const materials = [
    { id: '1', title: 'Algebra Basics' },
    { id: '2', title: 'Physics: Motion' },
    { id: '3', title: 'World War II History' },
    { id: '4', title: 'Computer Networks' },
    { id: '5', title: 'Organic Chemistry' },
  ];

  const toggleMaterialSelection = (id) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((matId) => matId !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Select Materials for Your Quiz</Text>
        <Text style={styles.subtitle}>Pick the study materials you'd like to be quizzed on.</Text>
      </View>

      {/* Material List Section */}
      <FlatList
        data={materials}
        keyExtractor={(item) => item.id}
        style={styles.materialList}
        renderItem={({ item }) => (
          <View style={styles.materialContainer}>
            <CustomCheckbox
              isChecked={selectedMaterials.includes(item.id)}
              onToggle={() => toggleMaterialSelection(item.id)}
            />
            <Text style={styles.materialText}>{item.title}</Text>
          </View>
        )}
      />

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(selectedMaterials.length / materials.length) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {selectedMaterials.length} / {materials.length} Materials Selected
        </Text>
      </View>

      {/* Start Quiz Button */}
      {selectedMaterials.length > 0 && (
        <TouchableOpacity style={styles.startQuizButton} onPress={() => router.push('./quizscreen')}>
          <Text style={styles.startQuizText}>Start Quiz</Text>
        </TouchableOpacity>
      )}

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Tip: Select multiple materials to customize your quiz!</Text>
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
  materialList: {
    flex: 1,
    width: '100%',
  },
  materialContainer: {
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
  materialText: {
    fontSize: 18,
    color: '#0504aa',
    marginLeft: 15,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
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

export default QuizHome;
