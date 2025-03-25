import React, { useCallback } from 'react';
import { Slot, useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity, StyleSheet, Text, View, Platform, BackHandler, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const Layout = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { courseData } = useLocalSearchParams();
  const course = courseData ? JSON.parse(courseData) : null;

  // Disable hardware back button
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => backHandler.remove();
    }, [])
  );

  // Disable swipe gestures and hide default header
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
          onPress={() => router.back()} // Normal back navigation
          activeOpacity={0.6}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FlashCards</Text>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Slot />
      </View>
    </SafeAreaView>
  );
};

export default Layout;

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
      android: { elevation: 4 },
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
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
});
