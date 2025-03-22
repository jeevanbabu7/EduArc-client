import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons'; 
import Fontisto from '@expo/vector-icons/Fontisto';
import io from "socket.io-client";
import { useUser } from '../../context/userContext';
import * as DocumentPicker from 'expo-document-picker';
import { IP_ADDRESS,COLLEGE_IP_ADDRESS, PORT } from 'expo-constants'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import getEnvVars from '../../config.js';
import { useToast } from '@gluestack-ui/themed';
import { ID } from 'react-native-appwrite';
import { storage } from '../../lib/appwrite/appwrite.js';
import axios from 'axios';
import { getModelResponse } from '../../lib/cohere.js';
import { useChat } from "../../context/ChatContext.js";
const ChatBot = () => {
  // const { chatId, chatTitle } = useLocalSearchParams(););
  const { currentChat, setCurrentChat } = useChat();
  const { id: chatId, title: chatTitle } = currentChat;
  const data = useLocalSearchParams();


  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [socket, setSocket] = useState(null);
  const navigation = useNavigation();

  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const {currentUser} = useUser();
  
  const toast = useToast();
  const {IP_ADDRESS} = getEnvVars();
  console.log(IP_ADDRESS)
  const [isNewChat, setIsNewChat] = useState(true);

  // fetch chat messages

  const fetchFileBlob = async (fileUri) => {
    const response = await fetch(fileUri);
    return await response.blob();
  };

  const storeFileInAppwrite = async () => {
    try {
      const fileBlob = await fetchFileBlob(file.uri);
      const response = await storage.createFile('67bccd990005a5d175c4', ID.unique(), fileBlob, [`write("any")`]);
      return response.$id;
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert('Error', 'An error occurred while uploading the file to Appwrite.');
    }
  };

  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setFile(result.assets[0]);
        const fileID = await storeFileInAppwrite();
        setFileURL(`https://cloud.appwrite.io/v1/storage/buckets/67bccd990005a5d175c4/files/${fileID}/view?project=67bcccfe0010a29974a4&mode=admin`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while picking the file.');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chatTitle || 'Chat',
    });
  }, [navigation, chatTitle]);

  const { user } = useUser();

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      if(chatId == null) return;
      try {
        const response = await fetch(`${IP_ADDRESS}:3000/api/chat/get-messages/${chatId}`);
        const data = await response.json();

        if (data.messages.length > 0) {
          setIsNewChat(false);
          setMessages((prev) => {
            const messages = data.messages.map((message) => {
              if (message.sender === 'user') {
                return {
                  _id: Math.random().toString(36).substring(7),
                  text: message.content,
                  createdAt: message.createdAt,
                  user: {
                    _id: 1,
                    name: 'User',
                    avatar: 'https://placekitten.com/100/100',
                  },
                };
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
                };
              }
            });
            messages.reverse();
            return messages.slice(0, 20);
          });
        } else {
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
    };

    fetchPreviousMessages();
  }, [chatId]);

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



  const handleSend = async () => {
    try {
      console.log(isNewChat);
  
      // if (isNewChat) {
        setIsNewChat(false);
        console.log("Creating new chat session");
  
        const response = await fetch(`${IP_ADDRESS}:3000/api/chat/new-chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser.$id,
          }),
        });
        console.log("Chat creation response:", response);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const responseData = await response.json();
        console.log("Chat creation response:", responseData);
      // }
  
      if (inputText.trim()) {

        const response = await fetch(`${IP_ADDRESS}:3000/api/chat/send-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatSessionId: chatId,
            content: inputText,
            sender: "user",
          }),
        });
        // console.log("Message sending response:", response);
        const userMessage = {
          _id: Math.random().toString(36).substring(7),
          text: inputText,
          createdAt: new Date(),
          user: {
            _id: 1,
          },
        };
  
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [userMessage]));
        setInputText('');
  
        const botmsg = await getModelResponse(inputText);
        const botResponse = await fetch(`${IP_ADDRESS}:3000/api/chat/send-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatSessionId: chatId,
            content: botmsg,
            sender: "bot",
          }),
        });
        const botMessage = {
          _id: Math.random().toString(36).substring(7),
          text: botmsg,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'ChatBot',
            avatar: 'https://placekitten.com/100/100',
          },
        };
  
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  const handleKeyPress = (event) => {
    if (event.nativeEvent.key !== 'Enter' && event.nativeEvent.key !== 'NumpadEnter') {
      return;
    }
    handleSend();
  };

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
              left: { backgroundColor: '#f3f4f6', marginLeft: -34 ,width:'100%'},
              right: { backgroundColor: '#f0f2ff' },
            }}
            textStyle={{
              left: { color: '#374151' },
              right: { color: '#374151' },
            }}
            timeTextStyle={{
              left: { color: '#4B5563' }, 
              right: { color: '#4B5563' },
            }}
          /> 
        )}
        renderInputToolbar={() => (
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={uploadFile}>
              <Fontisto name="paperclip" size={22} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              style={styles.input}
              placeholder="Type your message..."
              placeholderTextColor="#9ca3af"
              onKeyPress={handleKeyPress}
              multiline={true}
              returnKeyType="default"
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
    // paddingTop: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 10,
    marginVertical: 15,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
},

  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#374151',
  },
  sendButton: {
    borderRadius: 25,
    padding: 10,
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
});

export default ChatBot;
