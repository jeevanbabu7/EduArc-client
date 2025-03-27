import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image } from 'react-native';
import left from '../../assets/icons/left.png';
import right from '../../assets/icons/right.png';
import { useLocalSearchParams } from 'expo-router';

const FlashcardScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const { data } = useLocalSearchParams();

  // Parse flashcard data from URL params or use fallback cards
  const flashcards = React.useMemo(() => {
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
              answer: questionData.explanation || questionData.correct_answer
            };
          });
        }
      } catch (error) {
        console.error('Error parsing flashcard data:', error);
      }
    }
    
    // Fallback flashcards if data is missing or invalid
    return [
      { id: 1, question: "What is the capital of France?", answer: "Paris is the capital of France. It's known for the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral." },
      { id: 2, question: "What is 2 + 2?", answer: "4. This is a basic arithmetic addition." },
      { id: 3, question: "What is the largest mammal?", answer: "The Blue Whale is the largest mammal on Earth, reaching lengths of up to 100 feet." }
    ];
  }, [data]);

  useEffect(() => {
    // Reset to first card when new data is loaded
    setCurrentIndex(0);
    setFlipped(false);
    flipAnim.setValue(0);
  }, [flashcards]);

  const handleFlip = () => {
    setFlipped(!flipped);
    Animated.timing(flipAnim, {
      toValue: flipped ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    flipAnim.setValue(0);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    flipAnim.setValue(0);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg']
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }]
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }]
  };

  return (
    <View style={styles.container}>
      
      {/* Progress Indicator */}
      <Text style={styles.progressText}>{currentIndex + 1} / {flashcards.length}</Text>

      {/* Flashcard */}
      <TouchableOpacity style={styles.flashcard} onPress={handleFlip}>
        <Animated.View style={[styles.card, styles.frontCard, frontAnimatedStyle]}>
          <Text style={styles.cardTitle}>Question</Text>
          <Text style={styles.text}>{flashcards[currentIndex].question}</Text>
          <Text style={styles.tapHint}>Tap to see answer</Text>
        </Animated.View>
        <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
          <Text style={styles.cardTitle}>Answer</Text>
          <Text style={styles.text}>{flashcards[currentIndex].answer}</Text>
          <Text style={styles.tapHint}>Tap to see question</Text>
        </Animated.View>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, currentIndex === 0 && styles.disabledButton]} 
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <Image source={left} style={styles.icon} />
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, currentIndex === flashcards.length - 1 && styles.disabledButton]} 
          onPress={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          <Text style={styles.buttonText}>Next</Text>
          <Image source={right} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2ff',
    padding: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  flashcard: {
    marginBottom: 20,
    width: 320,
    height: 350,
    position: 'relative',
  },
  card: {
    backgroundColor: 'white',
    width: 320,
    height: 350,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 12,
    position: 'absolute',
    backfaceVisibility: 'hidden',
    padding: 20,
  },
  frontCard: {
    backgroundColor: '#fff',
  },
  backCard: {
    backgroundColor: '#e6f7ff',
    transform: [{ rotateY: '180deg' }]
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0504aa',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    paddingHorizontal: 10,
    color: '#333',
  },
  tapHint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#0504aa',
    minWidth: 120,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#b5b5e0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});

export default FlashcardScreen;
