import React from 'react'
import { Image, Text, View,StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import homeicon from '../../assets/icons/home.png'
import profile from '../../assets/icons/profile.png'
import plus from '../../assets/icons/plus.png'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={icon}
        style={{
          width: 24, 
          height: 24,
          tintColor: color,  
        }} 
      />
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: true,
      }}>
        <Tabs.Screen 
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={homeicon}
                color={color}  // Use dynamic color
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="learn"
          options={{
            title: 'Learn',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={plus}
                color={color}
                name="Learn"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
const styles = StyleSheet.create({
  container: {
    flex: 1,                 
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});