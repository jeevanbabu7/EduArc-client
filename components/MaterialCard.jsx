import { StyleSheet, Text, TouchableOpacity, View, Alert,Image } from 'react-native';
import React, { useRef } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import edit from '../assets/icons/edit.png';
import deleteicon from '../assets/icons/delete.png';
import info from '../assets/icons/info.png';

const MaterialCard = ({ title, onPress, onEdit, onDelete }) => {
  const refRBSheet = useRef(null);

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {/* Book Icon */}
        <View style={styles.iconContainer}>
          <FontAwesome name="book" size={20} color="#0504aa" />
        </View>

        {/* Course Name & Last Opened */}
        <TouchableOpacity style={styles.textContainer} onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>Last opened: Jan 1, 2025</Text>
        </TouchableOpacity>

        {/* More Options (Ellipsis Icon) */}
        <TouchableOpacity style={styles.iconContainer} onPress={() => refRBSheet.current.open()}>
          <Ionicons name="ellipsis-vertical" size={20} color="#0504aa" />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet for Options */}
      <RBSheet
        ref={refRBSheet}
        draggable={true}
        closeOnPressMask={true}
        customStyles={styles.sheet}
      >
        {/* Edit Option */}
        <TouchableOpacity style={styles.sheetItem} onPress={() => {
          refRBSheet.current.close();
          onEdit && onEdit();
        }}>
          <Image source={edit} style={styles.sheetIcon} />
          <Text style={styles.sheetText}>Edit Course</Text>
        </TouchableOpacity>

        {/* Delete Option */}
        <TouchableOpacity style={styles.sheetItem} onPress={() => {
          refRBSheet.current.close();
          Alert.alert("Delete Course", "Are you sure you want to delete this course?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", onPress: () => onDelete && onDelete() }
          ]);
        }}>
          <Image source={deleteicon} style={styles.sheetIcon} />
          <Text style={styles.sheetText}>Delete Course</Text>
        </TouchableOpacity>

        {/* View Details Option */}
        <TouchableOpacity style={styles.sheetItem} onPress={() => {
          refRBSheet.current.close();
          Alert.alert("Course Details", `Details about ${title}`);
        }}>
          <Image source={info} style={styles.sheetIcon} />
          <Text style={styles.sheetText}>View Details</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

export default MaterialCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  sheet: {
    wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' },
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      backgroundColor: '#f0f2ff',
      height: '40%',
    },
    draggableIcon: { backgroundColor: '#000' },
  },
  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap:10
  },
  sheetIcon: {
    width: 24, // Adjust based on your icon size
    height: 24,
    marginRight: 10,
    resizeMode: 'contain', // Ensures the icon fits properly
  },
  sheetText: {
    fontSize: 18, // Make text slightly larger
    color: '#333',
    fontWeight:'500'
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 18,
    color: '#0504aa',
    fontWeight: 'bold',
  },
});