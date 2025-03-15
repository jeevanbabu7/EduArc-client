import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useQuiz } from '../../hooks/QuizContext'; // Import the context hook
import { useRouter } from 'expo-router';
import PieChart from 'react-native-pie-chart'; // Import PieChart
import bulb from '../../assets/icons/lightbulb.png';

const QuizResult = () => {
  const router = useRouter();
  const { quizState } = useQuiz(); // Access the quiz state from context

  const correctAnswers = quizState.score;
  const incorrectAnswers = quizState.total - quizState.score;
  const totalQuestions = quizState.total;
  const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2); // Calculate percentage
  const widthAndHeight = 125; // Size of Pie Chart

  const series = [
    { value: correctAnswers, color: '#0504aa' },  // Blue for correct answers
    { value: incorrectAnswers, color: '#ff6c00' }, // Orange for incorrect answers
  ];

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>You're Learning!</Text>
      <View style={styles.container1}>
        <Text style={styles.subtitle}>
          Next, take more tests to learn and improve from mistakes until you get them right
        </Text>
        <Image source={bulb} style={styles.bulb} />
      </View>

      {/* Results Section */}
      <Text style={styles.resultsTitle}>Your Results</Text>

      {/* Pie Chart and Score Info */}
      <View style={styles.chartRow}>
        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <PieChart widthAndHeight={widthAndHeight} series={series} cover={0.5} /> 
          {/* <View style={styles.chartLabels}>
            <Text style={[styles.chartLabel, { color: '#0504aa' }]}>● Correct</Text>
            <Text style={[styles.chartLabel, { color: '#ff6c00' }]}>● Incorrect</Text>
          </View> */}
        </View>

        {/* Score and Percentage */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Score: <Text style={styles.boldText}>{correctAnswers}/{totalQuestions}</Text>
          </Text>
          <Text style={styles.percentageText}>
            Percentage: <Text style={styles.boldText}>{percentage}%</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.resultsTitle}>Next Steps</Text>
      
      {/* Result Summary */}
      <View style={styles.resultSummaryContainer}>
        <Text style={styles.resultSummary}>
          {correctAnswers / totalQuestions > 0.75
            ? "Great job! You did awesome!"
            : correctAnswers / totalQuestions > 0.5
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
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bulb: {
    height: 64,
    width: 64,
    marginLeft: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0504aa', // Consistent blue theme for title
    marginBottom: 10,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
    width: '75%', // Takes 75% of the width
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    marginVertical: 20,
    textAlign: 'left',
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartLabels: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  chartLabel: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  scoreContainer: {
    justifyContent: 'center',
    marginLeft: 20, // Add spacing from the chart
  },
  scoreText: {
    fontSize: 18,
    color: '#333',
  },
  percentageText: {
    fontSize: 18,
    color: '#333',
    marginTop: 5,
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
