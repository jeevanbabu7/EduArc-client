import React, { useRef, useEffect } from 'react';
import { Slot, useNavigation } from 'expo-router';
import { TouchableOpacity, Image, StyleSheet, Text, FlatList, View } from 'react-native';
import hamburger from '../../assets/icons/hamburger-icon.png';
import RBSheet from 'react-native-raw-bottom-sheet';

const Layout = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef(null);
  const dummy_flashcards = [
    { id: '1', title: 'New Course Added', message: 'You have a new course available: React Native Basics' },
    { id: '2', title: 'Assignment Due', message: 'Your "Data Structures" assignment is due tomorrow.' },
    { id: '3', title: 'Live Class Reminder', message: 'Join the live class for "Machine Learning" at 5 PM today.' },
    { id: '4', title: 'Profile Update', message: 'Your profile details were successfully updated.' },
  ];
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'FlashCards',
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => {
            if (refRBSheet.current) {
              refRBSheet.current.open();
            } else {
              console.log('RBSheet ref is not available');
            }
          }}
        >
          <Image source={hamburger} style={styles.menuIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <Slot />
      <RBSheet
        ref={refRBSheet}
        draggable={false} // Changed to false to remove the notch
        closeOnPressMask={true}
        animationType="slide"
        customStyles={{
          wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 0, // Removed padding to allow header to sit at the top
            backgroundColor: '#fff',
            height: '75%',
          },
          // Removed draggableIcon style since we're not using it anymore
        }}
      >
        <View style={styles.sheetHeader}>
          <Text style={styles.savedFlashcard}>Saved FlashCards</Text>
        </View>
        <FlatList
          data={dummy_flashcards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      </RBSheet>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  menuIcon: {
    width: 24,
    height: 24,
  },
  sheetHeader: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  savedFlashcard: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:'#4D75F9'
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notificationItem: {
    backgroundColor: '#f0f2ff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});