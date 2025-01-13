import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity,Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from react-navigation/native
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
  const navigation = useNavigation(); // Use the useNavigation hook

  const handleDone = () => {

    navigation.replace('home'); // Use replace to navigate to Home screen without returning to onboarding
    setItem('onboarded','1');
};

  const handleSkip = () => {
    navigation.replace('home'); // Navigate to Home screen without returning to onboarding
  };

  const doneButton = ({...props}) =>{
    return(
      <TouchableOpacity style={styles.done} {...props}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    )
  }

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
    paddingBottom: 30, // Ensure the Skip and Next buttons fit properly
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#282534', // Change the title color
  },
  subtitle: {
    fontSize: 14,
    color: '#282534', // Change the subtitle color
  },
  nextButton: {
    backgroundColor: '#282534', // Background color for Next button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  skipButton: {
    borderColor: '#282534', // Border color for Skip button
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff', // Text color for Next button
    fontWeight: 'bold',
    fontSize: 15,
  },
  skipButtonText: {
    color: '#282534', // Text color for Skip button
    fontWeight: 'bold',
    fontSize: 15,
  },
  done:{
    padding:20,
  },
  doneText:{
    fontWeight:500,
    fontSize:15,
    
  }
});

export default OnboardingScreen;
