import React, { useState, useCallback, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons'; 
import Fontisto from '@expo/vector-icons/Fontisto';
import io from "socket.io-client";


const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [keyPressed, setKeyPressed] = useState(false);
  const [socket, setSocket] = useState(null);
  console.log(keyPressed);
  
  useEffect(() => {
    if (!socket) return;
    socket.on('model_response', (message) => {
      
        const botMessage = {
          _id: Math.random().toString(36).substring(7),
          text: message,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'ChatBot',
            avatar: 'https://placekitten.com/100/100',
          },
        };
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
        
    });
  }, [socket]);
    
    useEffect(() => {

        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I assist you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatBot',
          avatar: 'https://placekitten.com/100/100',
        },
      },
    ]);
  }, []);

  
  const handleSend = () => {
    
    if (inputText.trim()) {
      const userMessage = {
        _id: Math.random().toString(36).substring(7),
        text: inputText,
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      };
      socket.emit('send-message', {
          chatSessionId: "6784f44000f0f6bfc930954f",
          sender: "user",
          content: inputText
      });


      
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [userMessage]));
      // onSend([userMessage]);
      setInputText('');
    }
  };

  const handleKeyPress = (event) => {
    if(event.nativeEvent.key !== 'Enter' || event.nativeEvent.key !== 'NumpadEnter'){
      return;
    }
    handleSend();
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        user={{
          _id: 1,
        }}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: { backgroundColor: '#f3f4f6',
                marginLeft: -34
               },
              right: { backgroundColor: '#f3f4f6' },
            }}
            textStyle={{
              left: { color: '#374151' },
              right: { color: '#374151' },
            }}
          />
        )}
        renderInputToolbar={() => (
          <View style={styles.inputContainer}>
            <Fontisto name="paperclip" size={20} color="black" style={styles.icon} />
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              style={styles.input}
              placeholder="Type your message..."
              placeholderTextColor="#9ca3af"
              onKeyPress={handleKeyPress}
              returnKeyType="done" // Optional: changes the keyboard's enter button text
              blurOnSubmit={false} // Prevent keyboard from dismissing when pressing enter
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Ionicons name="send" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Tailwind's gray-50
    borderRadius: 25, // Rounded corners for the input container
    borderWidth: 1,
    borderColor: '#d1d5db', // Tailwind's gray-300
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#374151', // Tailwind's gray-700
  },
  sendButton: {
     // Tailwind's blue-600
    borderRadius: 25,
    padding: 10,
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
});

export default ChatBot;
