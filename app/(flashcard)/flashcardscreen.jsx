import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

const FlashcardScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const flashcards = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the largest mammal?", answer: "Blue Whale" }
  ];

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
    transform: [
      { rotateY: frontInterpolate }
    ]
  };

  const backAnimatedStyle = {
    transform: [
      { rotateY: backInterpolate }
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashcards</Text>
      <TouchableOpacity style={styles.flashcard} onPress={handleFlip}>
        <Animated.View style={[styles.card, styles.frontCard, frontAnimatedStyle]}>
          <Text style={styles.text}>{flashcards[currentIndex].question}</Text>
        </Animated.View>
        <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
          <Text style={styles.text}>{flashcards[currentIndex].answer}</Text>
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePrevious}>
          <Text style={[styles.buttonText, styles.blueText]}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={[styles.buttonText, styles.blueText]}>Next</Text>
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
    backgroundColor: '#f5f5f5', // Light background color
  },
  title: {
    fontSize: 30,
    color: '#333',
    marginBottom: 20,
  },
  flashcard: {
    marginBottom: 20,
    width: 300,
    height: 200,
    position: 'relative',
  },
  card: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#090088', // Dark blue front
    borderRadius: 10,
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  frontCard: {
    backgroundColor: '#090088',
  },
  backCard: {
    backgroundColor: '#6600ff',
    transform: [{ rotateY: '180deg' }]
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  blueText: {
    color: '#6600ff', // Blue text color for buttons
  },
  buttonText: {
    fontSize: 18,
  },
});

export default FlashcardScreen;
