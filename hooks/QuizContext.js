import React, { createContext, useContext, useState } from 'react';

// Create context
const QuizContext = createContext();

// Provider component
export const QuizProvider = ({ children }) => {
  const [quizState, setQuizState] = useState({
    score: 0,
    total: 0,
  });

  // Function to update quiz results
  const setQuizResults = (score, total) => {
    setQuizState({ score, total });
  };

  return (
    <QuizContext.Provider value={{ quizState, setQuizResults }}>
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use the Quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
