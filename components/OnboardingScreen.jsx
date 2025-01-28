import React from 'react';
import { useRouter } from 'expo-router';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { setItem } from '../scripts/asyncStorage';

const slides = [
  {
    id: '1',
    image: require('../assets/images/slide1.png'),
    title: 'Best Digital Solution',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    image: require('../assets/images/slide2.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '3',
    image: require('../assets/images/slide3.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '4',
    image: require('../assets/images/slide4.png'),
    title: 'Boost Productivity',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '5',
    image: require('../assets/images/slide5.png'),
    title: 'Achieve Success',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const OnboardingScreen = () => {
  const router = useRouter(); // Use the useRouter hook from expo-router

  const handleDone = () => {
    setItem('onboarded', '1'); // Save onboarding state
    router.replace('(tabs)/home'); // Redirect to (tabs)/home
  };

  const handleSkip = () => {
    router.replace('(auth)/signin'); // Redirect to (tabs)/home
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.done} {...props}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleSkip}
        DoneButtonComponent={doneButton}
        bottomBarHighlight={false}
        pages={slides.map((slide) => ({
          backgroundColor: '#fff',
          image: <Image style={styles.image} source={slide.image} />,
          title: slide.title,
          subtitle: slide.subtitle,
        }))}
        nextLabel="Next"
        skipLabel="Skip"
        doneLabel="Done"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#282534',
  },
  subtitle: {
    fontSize: 14,
    color: '#282534',
  },
  nextButton: {
    backgroundColor: '#282534',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  skipButton: {
    borderColor: '#282534',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  skipButtonText: {
    color: '#282534',
    fontWeight: 'bold',
    fontSize: 15,
  },
  done: {
    padding: 20,
  },
  doneText: {
    fontWeight: '500',
    fontSize: 15,
  },
});

export default OnboardingScreen;
