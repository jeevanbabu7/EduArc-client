import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { Slot } from "expo-router";
import axios from "axios";
import edit from '../../assets/icons/edit.png';
import getEnvVars from "../../config";
import { ChatProvider, useChat } from "../../hooks/ChatContext"; // Update path as needed

const Drawer = createDrawerNavigator();

// Dummy data for chat history
const DUMMY_CHAT_HISTORY = [
  { id: "chat1", title: "Chat with Alice" },
  { id: "chat2", title: "Chat with Bob" },
  { id: "chat3", title: "Chat with Charlie" }
];

// Custom drawer content component - Notice this is defined INSIDE the layout component now
function CustomDrawerContent({ navigation }) {
  const [chatHistory, setChatHistory] = useState(DUMMY_CHAT_HISTORY);
  const { setCurrentChat } = useChat(); // Use the context
  const { HOME_IP_ADDRESS } = getEnvVars();
  
  useEffect(() => {
    fetchChatHistory();
  }, []);
  
  const fetchChatHistory = async () => {
    try {
      const userId = "67d3ee4435aa92b97a1a70dc";
      const response = await axios.get(`http://${HOME_IP_ADDRESS}/api/chat/get-chat-sessions/${userId}`);
      
      if (response.data.chatSessions && response.data.chatSessions.length > 0) {
        setChatHistory(response.data.chatSessions);
      }
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  const handleChatPress = (chat) => {
    // Update the current chat in context
    setCurrentChat({
      id: chat.id,
      title: chat.title
    });
    
    // Log for debugging
    // console.log("Selected chat:", chat);
    
    // Close the drawer
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.chatContainer}>
        <Text style={styles.chatTitle}>Chat History</Text>
        {chatHistory.map((chat) => (
          <TouchableOpacity 
            key={chat.id.toString()}
            style={styles.chatItem} 
            onPress={() => handleChatPress(chat)}
          >
            <Text style={styles.chatText}>{chat._id}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

// Header right component
const HeaderRight = () => (
  <TouchableOpacity>
    <Image source={edit} style={styles.menuIcon} />
  </TouchableOpacity>
);

export default function Layout() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: "left",
        drawerStyle: { width: 250 },
      }}
    >
      <Drawer.Screen
        name="Chatbot"
        initialParams={{ chatId: 1, chatTitle: "Chat with Alice" }}
        options={{
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "black",
          headerTitle: "Chat",
          headerRight: HeaderRight,
        }}
      >
        <Drawer.Screen name="index">
          {() => <Slot />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </ChatProvider>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15, 
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chatItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  chatText: {
    fontSize: 16,
  },
});