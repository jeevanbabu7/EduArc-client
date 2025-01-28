import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import LoginForm from './signin.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';

const _layout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginForm />
    </SafeAreaView>
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
