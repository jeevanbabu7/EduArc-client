import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation, Slot } from "expo-router"; 
import hamburger from "../../assets/icons/hamburger-icon.png";
import edit from '../../assets/icons/edit.png';
import getEnvVars from "../../config";
import axios from "axios";
import { useRouter } from "expo-router"
import { useUser } from "../../context/userContext";
import { useChat } from "../../context/ChatContext";
// Custom Drawer Content - Only Chat History
function CustomDrawerContent() {
  const router = useRouter();
  const {currentUser} = useUser();
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Chat with Alice" },
    { id: 2, title: "Chat with Bob" },
    { id: 3, title: "Chat with Charlie" },
  ]);
  
  const navigation = useNavigation();
  const { HOME_IP_ADDRESS, IP_ADDRESS } = getEnvVars();
  const {currentChat, setCurrentChat} = useChat();
  console.log("Current Chat:", currentChat);
  

  useEffect(() => {
    console.log("hiiiiiiiiiiiiii");
    
    const fetchChatHistory = () => {
      console.log("Hii");
      axios.get(`${IP_ADDRESS}:3000/api/chat/get-chat-sessions/67c7413f000ddf76f421`).then((res) => {
        console.log(res.data);
        setChatHistory(res.data.chatSessions);
      }).catch((err) => {
        console.log(err);
      });
      // setChatHistory(res);
    };
    fetchChatHistory();
  }, []);

  return (
    <DrawerContentScrollView>
      <View style={styles.chatContainer}>
        <Text style={styles.chatTitle}>Chat History</Text>
        {chatHistory.map((chat, index) => (
          <TouchableOpacity 
          key={index} 
          style={styles.chatItem} 
          onPress={() => {
            console.log("clicked", chat._id);
            // Update the chat context first
            setCurrentChat({id: chat._id, title: chat._id});
            // console.log("Current Chat:", currentChat);
            
            // Use setTimeout to ensure the state update has time to propagate
            setTimeout(() => {
              router.push({ pathname: "/(chat)/Chatbot", params: { chatId: chat._id, chatTitle: chat._id }});
            }, 1000);
          }}
        >
          <Text style={styles.chatText}>{chat._id}</Text>
        </TouchableOpacity>
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Layout Component with the Hamburger Menu
export default function Layout() {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      drawerContent={() => <CustomDrawerContent />}
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
          headerRight: () => (
            <TouchableOpacity>
              <Image source={edit} style={styles.menuIcon} />
            </TouchableOpacity>
          ),
        }}
      >
        {() => <Slot />} 
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

// Styles
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
