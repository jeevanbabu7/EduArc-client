import { ID } from "react-native-appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite/appwrite";
import { toast } from "../lib/appwrite/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "@gluestack-style/react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { makeRedirectUri } from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from "expo-router";
import axios from "axios";
const UserContext = createContext();

import getEnvVars from '../config.js';
export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null);
  const router = useRouter();
  const { IP_ADDRESS } = getEnvVars();
  async function login(email, password) {
    try {

      const session = await account.createEmailPasswordSession(email, password);
      const userDetails = await account.get(); 
      setUser(userDetails);
      await AsyncStorage.setItem("user", JSON.stringify(userDetails)); // Store user data
      toast("Welcome back. You are logged in");

      return { success: true, user: userDetails };
    } catch (error) {
      toast("Login failed: " + error.message);
    }
  }

  async function googleAuth() {
    console.log("Google Auth");
    
    const deepLink = new URL(makeRedirectUri({preferLocalhost: true}));
    if (!deepLink.hostname) {
        deepLink.hostname = 'localhost';
    }
    const scheme = `${deepLink.protocol}//`; // e.g. 'exp://' or 'playground://'

    
    // Start OAuth flow
    const provider = 'google';
    const loginUrl = await account.createOAuth2Token(
        provider,
        `${deepLink}`,
        `${deepLink}`,
    );
    console.log("mmmm",loginUrl);
    
    // Open loginUrl and listen for the scheme redirect
    const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);
    console.log(result);
    
    // Extract credentials from OAuth redirect URL
    const url = new URL(result.url);
    const secret = url.searchParams.get('secret');
    const userId = url.searchParams.get('userId');

    // Create session with OAuth credentials
    await account.createSession(userId, secret);
    const userDetails = await account.get();
    setUser(userDetails);
    await AsyncStorage.setItem("user", JSON.stringify(userDetails)); 
    return userDetails;
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    toast('Logged out');
    router.replace('(auth)/signin');
    
  }

  async function register(email, password) {
    try {
    
      const newUser = await account.create(ID.unique(), email, password);
      
      try {
        fetch(`http://${IP_ADDRESS}:3000/api/auth/newUser`, {
          name: newUser.name,
          email: newUser.email,
          userId: newUser.$id
        },{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newUser.name,
            email: newUser.email,
            userId: newUser.$id 
          })}).then(res => {
            console.log(res);
            return res.json();
          })
        .then(data => {
          console.log(data);
        })
        console.log("User data sent to backend successfully");
      } catch (err) {
        console.log("Error sending user data to backend:", err.message);
        // Continue with registration process even if backend sync fails
      }
      
      toast('Account created successfully');
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error("Registration Error:", error);

      if (error.code === 400) {
        toast("Invalid email or password format");
        setMsg("Invalid email or password format");
      } else if (error.code === 409) {
        toast("This email is already in use");
        setMsg("This email is already in use");
      } else {
        toast("Something went wrong. Please try again.");
        setMsg("Something went wrong. Please try again.");
      }
  
      return { success: false, error: msg };
    }
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      // console.log("Logged in user", loggedIn);
      
      setUser(loggedIn);

      router.replace('(tabs)/home');
      toast('Welcome back.');
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser: user, login, logout, register, toast, googleAuth }}>
      {props.children}
    </UserContext.Provider>
  );
}
