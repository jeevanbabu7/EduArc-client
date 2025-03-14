import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image } from 'react-native';
import left from '../../assets/icons/left.png';
import right from '../../assets/icons/right.png';

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
          <Text style={styles.text}>{flashcards[currentIndex].question}</Text>
        </Animated.View>
        <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
          <Text style={styles.text}>{flashcards[currentIndex].answer}</Text>
        </Animated.View>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePrevious}>
          <Image source={left} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
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
    height: 250,
    position: 'relative',
  },
  card: {
    backgroundColor: 'white',
    width: 320,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 12,
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  frontCard: {
    backgroundColor: '#fff',
  },
  backCard: {
    transform: [{ rotateY: '180deg' }]
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#0504aa'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f2ff',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default FlashcardScreen;
