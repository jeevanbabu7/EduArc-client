import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuiz } from '../../hooks/QuizContext'; // Import the context hook
import { useRouter } from 'expo-router';

const QuizResult = () => {
  const router = useRouter();
  const { quizState } = useQuiz(); // Access the quiz state from context

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Results</Text>
      <Text style={styles.resultText}>
        You scored {quizState.score} out of {quizState.total}.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/quizhomescreen')} // Go back to quiz home
      >
        <Text style={styles.buttonText}>Take Another Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QuizResult;
