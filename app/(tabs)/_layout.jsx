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
        width: 25,
        height: 25,
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
          backgroundColor: '#F5F9FF',
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          // position: 'absolute',
          height: 60,
          display: 'flex',
          paddingTop: 10,
          fontSize: 10,
          paddingBottom: 10,
          // flexDirection: 'row',
          // justifyContent: 'space-between',
          // alignItems: 'center',
          // paddingTop: 8, // Add some padding for vertical alignment
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center', // Center the icons vertically
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 15,
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
