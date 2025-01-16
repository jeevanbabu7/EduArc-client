import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuiz } from '../../hooks/QuizContext'; // Import the context hook
import { useRouter } from 'expo-router';

const QuizResult = () => {
  const router = useRouter();
  const { quizState } = useQuiz(); // Access the quiz state from context

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Your Results</Text>

      {/* Result Text */}
      <Text style={styles.resultText}>
        You scored <Text style={styles.boldText}>{quizState.score}</Text> out of <Text style={styles.boldText}>{quizState.total}</Text>.
      </Text>

      {/* Result Summary */}
      <View style={styles.resultSummaryContainer}>
        <Text style={styles.resultSummary}>
          {quizState.score / quizState.total > 0.75
            ? "Great job! You did awesome!"
            : quizState.score / quizState.total > 0.5
            ? "Good effort! Keep practicing!"
            : "Don't give up! Try again!"}
        </Text>
      </View>

      {/* Button to retry quiz */}
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
    backgroundColor: '#f0f2ff', // Light background for the result screen
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0504aa', // Consistent blue theme for title
    marginBottom: 20,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#0504aa', // Highlight score in blue
  },
  resultSummaryContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  resultSummary: {
    fontSize: 18,
    color: '#0504aa',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0504aa', // Dark blue for button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizResult;
