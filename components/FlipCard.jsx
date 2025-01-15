import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const FlashcardScreen = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current; // To handle flip animation

  const flipCard = () => {
    // Flip card animation
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 1, // Toggle flip state
      friction: 8,
      tension: 60,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped); // Toggle flip state
  };

  // Interpolating the animation value for a smooth 180-degree flip
  const rotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Define front and back of the card
  const frontStyle = {
    transform: [{ rotateY }],
    opacity: flipAnim.interpolate({
      inputRange: [0, 0.5],
      outputRange: [1, 0],
    }),
  };
  
  const backStyle = {
    transform: [{ rotateY }],
    opacity: flipAnim.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={flipCard} style={styles.cardContainer}>
        {/* Front of the card */}
        <Animated.View style={[styles.card, styles.cardFront, frontStyle]}>
          <Text style={styles.cardText}>What is the capital of France?</Text>
        </Animated.View>

        {/* Back of the card */}
        <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
          <Text style={styles.cardText}>Paris</Text>
        </Animated.View>
      </TouchableOpacity>
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
  cardContainer: {
    width: 300,
    height: 200,
    perspective: 1000, // Add perspective for better flipping effect
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    backfaceVisibility: 'hidden', // Prevent back of the card from being visible
  },
  cardFront: {
    backgroundColor: '#3498db',
  },
  cardBack: {
    backgroundColor: '#0504aa',
    transform: [{ rotateY: '180deg' }],
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default FlashcardScreen;
