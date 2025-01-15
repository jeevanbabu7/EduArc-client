import React from 'react';
import { Slot } from 'expo-router';
import { QuizProvider } from '../../hooks/QuizContext';

const Layout = () => {
  return (
    <QuizProvider>
      <Slot />
    </QuizProvider>
  );
};

export default Layout;
