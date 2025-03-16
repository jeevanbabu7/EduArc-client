import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation, Slot } from "expo-router"; 
import hamburger from "../../assets/icons/hamburger-icon.png";
import edit from '../../assets/icons/edit.png';
// Dummy Chat History
const chatHistory = [
  { id: 1, title: "Chat with Alice" },
  { id: 2, title: "Chat with Bob" },
  { id: 3, title: "Chat with Charlie" },
];

// Custom Drawer Content - Only Chat History
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.chatContainer}>
        <Text style={styles.chatTitle}>Chat History</Text>
        {chatHistory.map((chat) => (
          <TouchableOpacity key={chat.id} style={styles.chatItem}>
            <Text style={styles.chatText}>{chat.title}</Text>
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
        drawerPosition: "left", // Drawer opens from right
        drawerStyle: { width: 250 },
      }}
    >
      {/* The Slot component renders the actual chatbot screen */}
      <Drawer.Screen
        name="ChatbotScreen"
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
