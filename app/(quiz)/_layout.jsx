import React from 'react';
import { Slot, useNavigation } from 'expo-router';
import { QuizProvider } from '../../hooks/QuizContext';

const Layout = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Quiz',
    });
  }, [navigation]);

  return (
    <QuizProvider>
      <Slot />
    </QuizProvider>
  );
};

export default Layout;
