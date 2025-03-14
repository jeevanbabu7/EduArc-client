import { Stack } from 'expo-router';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import hamburger from '../../assets/icons/hamburger-icon.png';
import React from 'react';
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: 'black',
        headerTitle: 'Chat',
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Image source={hamburger} style={styles.menuIcon} />
          </TouchableOpacity>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
    menuIcon:{
        width: 25,
        height: 25
    }
    });
