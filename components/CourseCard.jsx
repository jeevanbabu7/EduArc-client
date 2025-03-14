import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React,{useRef} from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet';

const CourseCard = ({ title, onPress }) => {
  const refRBSheet = useRef(null);
  return (
    <View style={styles.card} >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <FontAwesome name="book" size={20} color="#0504aa" />
        </View>
        <TouchableOpacity style={styles.textContainer}onPress={onPress} >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>Last opened: Jan 1, 2025</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => refRBSheet.current.open()}>
          <Ionicons name="ellipsis-vertical" size={20} color="#0504aa" />
        </TouchableOpacity>
      </View>
      <RBSheet
          ref={refRBSheet}
          draggable={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' }, // Dim background
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              backgroundColor: '#fff',
              height: '50%'
            },
            draggableIcon: { backgroundColor: '#000' },
          }}
        >
          <Text>Option</Text>
          <Text>Option</Text>
          <Text>Option</Text>
          <Text>Option</Text>
      </RBSheet>
    </View>
  );
};



export default CourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffff',
    // borderWidth:0.2,
    // borderColor:'#00126b',
    borderRadius: 8,
    shadowColor: '#00126b', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
    margin: 5,
    paddingVertical: 10,
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
    flex: 1, // Ensures the text takes available space
    marginHorizontal: 10, // Spacing between text and icons
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#555', // Subtle color for the date
    marginTop: 4,
  },
});
 