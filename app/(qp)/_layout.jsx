import React from 'react';
import { Slot, useNavigation } from 'expo-router';
import { TouchableOpacity, Text, Alert,StyleSheet,View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Materials from './Pyqs';
import Analysis from './QpAnalysis'
import Prediction from './QpPrediction'
const Tab = createMaterialTopTabNavigator();

export default function QpLayout() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown:false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#c2c2ff', // Subtle inactive tint
        }}
      >
        <Tab.Screen name="Question Papers" component={Materials} />
        <Tab.Screen name="Analysis" component={Analysis} />
        <Tab.Screen name="Prediction" component={Prediction} />
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

