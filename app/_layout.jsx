import { StyleSheet, Text, View } from 'react-native'
import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import '../global.css'
const RootLayout = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} />
      <GluestackUIProvider config={config}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(courses)" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </>

  )
}

export default RootLayout

