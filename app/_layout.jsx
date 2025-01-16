import { StyleSheet, Text, View } from 'react-native'
import { Slot,Stack } from 'expo-router'
import { StatusBar } from 'react-native';

const RootLayout = () => {
  return (
    <>
    <StatusBar barStyle="dark-content" hidden={false} />
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}} />
      <Stack.Screen name="(auth)" options={{headerShown:false}} />
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
      <Stack.Screen name="(courses)" options={{headerShown:false}} />
    </Stack>
    </>
    
  )
}

export default RootLayout

