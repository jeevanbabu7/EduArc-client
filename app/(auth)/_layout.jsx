import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import LoginForm from './signin.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
    </Stack>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures SafeAreaView takes full height of the screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',
    height: '80%',

  },
});

export default _layout;
