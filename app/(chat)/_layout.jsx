import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation, Slot } from "expo-router"; 
import hamburger from "../../assets/icons/hamburger-icon.png";
import edit from '../../assets/icons/edit.png';
import getEnvVars from "../../config";
import axios from "axios";
import { useRouter } from "expo-router";

// Custom Drawer Content - Only Chat History
function CustomDrawerContent({ navigation }) {
  const router = useRouter();
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Chat with Alice" },
    { id: 2, title: "Chat with Bob" },
    { id: 3, title: "Chat with Charlie" },
  ]);
  
  const { HOME_IP_ADDRESS } = getEnvVars();

  useEffect(() => {
    const fetchChatHistory = async () => {
      const res = await axios.get(`http://172.16.33.11:3000/api/chat/get-chat-sessions/67d3ee4435aa92b97a1a70dc`);
      setChatHistory(res.data.chatSessions);
    };
    fetchChatHistory();
  }, []);

  const handleChatPress = (chat) => {
    console.log("hii");
    
    router.push('Chatbot', { chatId: chat._id, chatTitle: chat.title });
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.chatContainer}>
        <Text style={styles.chatTitle}>Chat History</Text>
        {chatHistory.map((chat) => (
          <TouchableOpacity 
            key={chat._id} 
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

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Layout Component with the Hamburger Menu
export default function Layout() {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: "left",
        drawerStyle: { width: 250 },
      }}
    >
      <Drawer.Screen
        name="ChatbotDrawer"
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
