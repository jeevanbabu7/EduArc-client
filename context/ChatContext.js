// ChatContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context with a default value
const ChatContext = createContext();

// Create a provider component
export const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState({
    id: '123',
    title: null
  });

  const value = { currentChat, setCurrentChat };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

// Create a custom hook to use the context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};