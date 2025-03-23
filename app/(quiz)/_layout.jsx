import React, { useCallback } from 'react';
import { Slot, useNavigation, useRouter } from 'expo-router';
import { TouchableOpacity, BackHandler, StyleSheet, View, Text, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QuizProvider } from '../../hooks/QuizContext';
import { useFocusEffect } from '@react-navigation/native';

const Layout = () => {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Disable the hardware back button
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        return true; // This disables the back button
      });
      return () => backHandler.remove();
    }, [])
  );

  // Hide the default header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButtonContainer}
          onPress={() => router.replace('/Tools')}
          activeOpacity={0.6}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz</Text>
      </View>
      
      {/* Main content */}
      <View style={styles.content}>
        <QuizProvider>
          <Slot />
        </QuizProvider>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },
  closeButtonContainer: {
    padding: 8,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8, // Moves the title closer to the Close button
  },
  content: {
    flex: 1,
  },
});

export default Layout;
