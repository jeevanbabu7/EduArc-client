import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useQuiz } from '../../hooks/QuizContext'; // Import the context hook
import { useRouter, useLocalSearchParams } from 'expo-router';

const QuizScreen = () => {
  const router = useRouter();
  const { data } = useLocalSearchParams(); // Get the data parameter from URL
  const { setQuizResults } = useQuiz(); // Access setQuizResults from context
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60-second timer
  const [isQuizFinished, setIsQuizFinished] = useState(false); // To track if quiz is finished
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in effect
  
  // Parse quiz data from URL params or use fallback questions
  const questions = React.useMemo(() => {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          return parsedData.map((item, index) => {
            // Parse the questions string to get the actual question object
            const questionData = JSON.parse(item.questions.replace(/'/g, '"'));
            return {
              id: index + 1,
              question: questionData.question,
              options: questionData.options,
              answer: questionData.correct_answer,
              explanation: questionData.explanation
            };
          });
        }
      } catch (error) {
        console.error('Error parsing quiz data:', error);
      }
    }
    
    // Fallback questions if data is missing or invalid
    return [
      { id: 1, question: 'What is the sum of 2 + 2? Please explain how to arrive at the answer step by step.', options: ['3', '4', '5', '6'], answer: '4' },
      { id: 2, question: 'What is the capital city of France? Name a few landmarks of this city.', options: ['Paris', 'Berlin', 'Madrid', 'Rome'], answer: 'Paris' },
    ];
  }, [data]);

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

  // Fade in effect for the question and options
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentQuestion]);

  return (
    <View style={styles.container}>
      {/* Header with Title and Timer */}
      <View style={styles.header}>
        <Text style={styles.title}>Quiz Time!</Text>
        <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      </View>

      {/* Question Section */}
      <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
        <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      </Animated.View>

      {/* Options */}
      <View style={styles.optionsContainer}>
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

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    backgroundColor: '#0504aa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  timer: {
    fontSize: 14, // Smaller font size for the timer
    color: '#fff',
    marginTop: 5,
  },
  questionContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 30, // Extra margin between question and options
  },
  question: {
    fontSize: 20, // Larger font size for longer questions
    fontWeight: 'bold',
    color: '#0504aa',
    textAlign: 'left',
    lineHeight: 29, // Increased line height for better readability
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#fff', // White background for options
    borderColor: '#3498db', // Blue border for options
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    color: '#0504aa', // Blue text color for options
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
});

export default QuizScreen;
