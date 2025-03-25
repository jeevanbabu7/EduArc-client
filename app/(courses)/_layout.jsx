import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Materials from './Materials';
import Tools from './Tools';
import Xyz from './Xyz';
import { useRouter, useLocalSearchParams } from 'expo-router';

const Tab = createMaterialTopTabNavigator();

export default function CourseLayout() {
  const { courseData } = useLocalSearchParams();
  const course = courseData ? JSON.parse(courseData) : null;

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>{course.name}</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#c2c2ff', // Subtle inactive tint
        }}
      >
        <Tab.Screen name="Materials" component={Materials} />
        <Tab.Screen name="Tools" component={Tools} />
        <Tab.Screen name="Progress" component={Xyz} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4D75F9', // Blue theme
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabBar: {
    backgroundColor: '#4D75F9', // Blue theme for the tab bar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'none', // Avoids uppercase text
  },
  tabBarIndicator: {
    backgroundColor: '#fff', // Highlighted indicator
    height: 3,
    borderRadius: 3,
  },
});
