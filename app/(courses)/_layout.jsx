import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Materials from './Materials';
import Tools from './Tools';
import Xyz from './Xyz';

const Tab = createMaterialTopTabNavigator();

export default function CourseLayout() {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Data Structures</Text>
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
        <Tab.Screen name="Xyz" component={Xyz} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0504aa', // Blue theme
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
    backgroundColor: '#0504aa', // Blue theme for the tab bar
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
