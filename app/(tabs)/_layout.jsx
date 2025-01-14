import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import homeicon from '../../assets/icons/home.png'
import profile from '../../assets/icons/profile.png'
import plus from '../../assets/icons/plus.png'

const TabIcon = ({ icon, focused }) => {
  return (
    <Image
      source={icon}
      style={{
        width: 20,
        height: 20,
        tintColor: focused ? '#00126b' : 'black',
      }}
    />
  )
}

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#00126b',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: 'white',
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          // position: 'absolute',
          height: 50,
          // paddingTop: 8, // Add some padding for vertical alignment
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center', // Center the icons vertically
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={homeicon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={plus} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={profile} focused={focused} />,
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
