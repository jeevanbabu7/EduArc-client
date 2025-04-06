import { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Slot, Stack } from 'expo-router';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import UserProvider from '../context/userContext';
import * as SplashScreen from 'expo-splash-screen';
import { ChatProvider } from '../context/ChatContext';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Simulate loading resources (e.g., fonts, API calls)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Error loading app resources:", error);
      } finally {
        setAppReady(true);
        await SplashScreen.hideAsync(); // Hide the splash screen when ready
      }
    };

    prepareApp();
  }, []);
  

  if (!appReady) {
    return null; // Show nothing until the app is ready
  }

  return (
    <>    
      <StatusBar barStyle="dark-content" backgroundColor="#4D75F9" hidden={false} />
      <GluestackUIProvider config={config}>
      <UserProvider>
        <ChatProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(courses)" options={{ headerShown: false }} />
            <Stack.Screen name="(chat)" options={{ headerShown: false }} />
            <Stack.Screen name="(qp)" options={{ headerShown: false }} />
            <Stack.Screen name="UploadMaterial" options={{ headerShown: false }} />
            <Stack.Screen name="ViewMaterial" options={{ headerShown: false }} />
            <Stack.Screen name="SuggestMaterial" options={{ headerShown: false }} />
          </Stack>
        </ChatProvider>
        </UserProvider>
      </GluestackUIProvider>
    
    </>
  );
};

export default RootLayout;
