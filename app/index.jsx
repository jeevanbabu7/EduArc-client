import { Text, View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import OnboardingScreen from '../components/OnboardingScreen';
import { getItem } from '../scripts/asyncStorage';
import './global.css';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
export default function Index() {
  // const [showOnboarding, setShowOnboarding] = useState(null);
  // const router = useRouter();

  // useEffect(() => {
  //   checkIfAlreadyOnboarded();
  // }, []);

  // useEffect(() => {
  //   if (showOnboarding === false) {
  //     router.replace('(tabs)/home'); // Redirect to home after onboarding
  //   }
  // }, [showOnboarding]);

  // const checkIfAlreadyOnboarded = async () => {
  //   try {
  //     const onboarded = await getItem('onboarded');
  //     // Default to true if the onboarded value is not set or incorrect
  //     setShowOnboarding(onboarded === '1' ? false : true);
  //   } catch (error) {
  //     console.error("Error checking onboarding status", error);
  //     setShowOnboarding(true); // Show onboarding if there's an error
  //   }
  // };

  // // Show nothing while determining the onboarding status
  // if (showOnboarding === null) {
  //   return null;
  // }

  // if (showOnboarding) {
  //   return <OnboardingScreen />; // Show OnboardingScreen if it's the first time
  // }

  // return null; // Just render nothing until redirect happens
  return <>
    <GluestackUIProvider config={config}>
      <OnboardingScreen />
    </GluestackUIProvider >
  </>
}

const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'grey',
    marginTop: 0,
  },
  text: {
    color: 'black',
    fontSize: 50,
  },
  image1: {
    width: 300,
    height: 300,
  },
});
