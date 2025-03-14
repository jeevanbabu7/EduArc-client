import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons'; 
import Fontisto from '@expo/vector-icons/Fontisto';
import io from "socket.io-client";
import { useUser } from '../../context/userContext';

import { IP_ADDRESS,COLLEGE_IP_ADDRESS, PORT } from 'expo-constants'
import { useNavigation } from 'expo-router';


const ChatBot = () => {
  console.log(IP_ADDRESS);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [keyPressed, setKeyPressed] = useState(false);
  const [socket, setSocket] = useState(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
    });
  }, [navigation]);
  const { user } = useUser();
  console.log(user);
  
  

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      try {
        const response = await fetch(`http://172.16.32.162:3000/api/chat/get-messages/67d3ef1f6d1812088b501946`);
        const data = await response.json();
        console.log("hiiiiiiiiiiii");
        console.log(response);
        
        
        
        if(data.messages.length > 0) {
          setMessages((prev) => {
            const messages = data.messages.map((message) => {
              if(message.sender === 'user') {
                return {
                  _id: Math.random().toString(36).substring(7),
                  text: message.content,
                  createdAt: message.createdAt,
                  user: {
                    _id: 1,
                    name: 'User',
                    avatar: 'https://placekitten.com/100/100',
                  },
                }
              } else {
                return {
                  _id: Math.random().toString(36).substring(7),
                  text: message.content,
                  createdAt: message.createdAt,
                  user: {
                    _id: 2,
                    name: 'ChatBot',
                    avatar: 'https://placekitten.com/100/100',
                  },
                }
              }
          })
          messages.reverse();
          return messages.slice(0, 20);
        });
        }else {
          setMessages([
            {
              _id: Math.random().toString(36).substring(7),
              text: 'Hello! How can I assist you today?',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'ChatBot',
                avatar: 'https://placekitten.com/100/100',
              },
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchPreviousMessages();
  }, []);
  
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
        const newSocket = io.connect(`http://172.16.32.162:${3000}`);
        setSocket(newSocket);
        newSocket.emit('create-chat', "67d3ee4435aa92b97a1a70dc");

        return () => newSocket.close();
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
          chatSessionId: "67d3ef1f6d1812088b501946",
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
              returnKeyType="done" 
              blurOnSubmit={false}
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
    paddingTop: 32
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
