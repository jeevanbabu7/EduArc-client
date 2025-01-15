import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuiz } from '../../hooks/QuizContext'; // Import the context hook
import { useRouter } from 'expo-router';

const QuizScreen = () => {
  const router = useRouter();
  const { setQuizResults } = useQuiz(); // Access setQuizResults from context
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60-second timer
  const [isQuizFinished, setIsQuizFinished] = useState(false); // To track if quiz is finished
  const questions = [
    { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
    { id: 2, question: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Madrid', 'Rome'], answer: 'Paris' },
  ];
  // Start timer when quiz begins
  useEffect(() => {
    if (isQuizFinished) return; // Prevent starting the timer if quiz is finished

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval); // Stop timer when it reaches 0
          setQuizResults(score, questions.length);
          router.push('/quizresult'); // Redirect to result screen
          setIsQuizFinished(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [score, currentQuestion, isQuizFinished]);

  const handleAnswer = (selected) => {
    if (selected === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1); // Move to next question
    } else {
      setQuizResults(score + 1, questions.length); // Final score update
      router.push('/quizresult'); // Redirect to result screen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Topic: Some Topic</Text>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      <Text style={styles.question}>
        {questions[currentQuestion].question}
      </Text>
      {questions[currentQuestion].options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.optionButton}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  timer: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QuizScreen;
