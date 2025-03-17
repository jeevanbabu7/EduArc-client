import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons'; 
import Fontisto from '@expo/vector-icons/Fontisto';
import io from "socket.io-client";
import { useUser } from '../../context/userContext';
import * as DocumentPicker from 'expo-document-picker';
import { IP_ADDRESS,COLLEGE_IP_ADDRESS, PORT } from 'expo-constants'
import { useNavigation } from 'expo-router';
import getEnvVars from '../../config.js';
import { useToast } from '@gluestack-ui/themed';
import { ID } from 'react-native-appwrite';
import { storage } from '../../lib/appwrite/appwrite.js';
import axios from 'axios';
import { getModelResponse } from '../../lib/cohere.js';
import { useLocalSearchParams } from 'expo-router';
const ChatBot = () => {
  const msg = useParams();
  console.log('hii',msg);
  

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [keyPressed, setKeyPressed] = useState(false);
    const [socket, setSocket] = useState(null);
    const navigation = useNavigation();
    const { PDF_BUCKET_ID } = getEnvVars();

    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState(null);
  
    const toast = useToast();
    
  
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
        console.log("Uploading file...");
        
        const result = await DocumentPicker.getDocumentAsync({
          type: 'application/pdf',
          copyToCacheDirectory: true,
        });
        console.log("File:", result);
        
        if (!result.canceled) {
          setFile(result.assets[0]);
          const fileID = await storeFileInAppwrite();
          console.log("File ID:", fileID);
          
          setFileURL(() => {
            return `https://cloud.appwrite.io/v1/storage/buckets/67bccd990005a5d175c4/files/${fileID}/view?project=67bcccfe0010a29974a4&mode=admin`
          });

          
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while picking the file.');
      }
    };

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
        const response = await fetch(`http://192.168.1.7:3000/api/chat/get-messages/67d3ef1f6d1812088b501946`);
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
        const newSocket = io.connect(`http://192.168.1.7:${3000}`);
        setSocket(newSocket);
        newSocket.emit('create-chat', "67d3ee4435aa92b97a1a70dc");

        return () => newSocket.close();
    }, []);


  
  const handleSend = async () => {
    try {
      // if(fileURL){
      //   // save the file to the chroma database 
      //   const response = await fetch('http://127.0.0.1:5000/api/upload', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       file_link: `https://cloud.appwrite.io/v1/storage/buckets/67bccd990005a5d175c4/files/${fileID}/view?project=67bcccfe0010a29974a4&mode=admin`
      //     })
      //   });
      //   const data = await response.json();
      //   console.log(data);
      //   const userMessage = {
      //     _id: Math.random().toString(36).substring(7),
      //     text: fileURL,
      //     createdAt: new Date(),
      //     user: {
      //       _id: 1,
      //     },
      //   };
      // }
      
      if (inputText.trim()) {
        const userMessage = {
          _id: Math.random().toString(36).substring(7),
          text: inputText,
          createdAt: new Date(),
          user: {
            _id: 1,
          },
        };
        
        // socket.emit('send-message', {
        //     chatSessionId: "67d3ef1f6d1812088b501946",
        //     sender: "user",
        //     content: inputText
        // });
  
  
        
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [userMessage]));
        // onSend([userMessage]);
        setInputText('');

        const botmsg = await getModelResponse(inputText);
        
  
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
    }catch(error) {
      console.error(error);
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
            <TouchableOpacity onPress={uploadFile}>
              <Fontisto name="paperclip" size={20} color="black" style={styles.icon} />
            </TouchableOpacity>
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
