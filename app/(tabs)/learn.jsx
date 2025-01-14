import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CourseCard from '../../components/CourseCard';
import { useRouter } from 'expo-router';

const Learn = () => {
  const router = useRouter(); // use the router hook properly

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.topbar}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>My Courses</Text>
        <Ionicons name="menu" size={22} color="#0504aa" />
      </View>
      <FlatList
        style={styles.cardContainer}
        data={[
          { key: 'Data Structures' },
          { key: 'Operating Systems' },
          { key: 'Linear Algebra' },
          { key: 'Commerce' },
          { key: 'Maths' },
          { key: 'Science' },
          { key: 'DBMS' }
        ]}
        renderItem={({ item }) => (
          <CourseCard
            title={item.key}
            onPress={() => router.push('(courses)/Materials')}
          />
        )}
        keyExtractor={(item) => item.key} // Add a keyExtractor to avoid warnings
      />
      
    </SafeAreaView>
  );
};

export default Learn;

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContainer: {
    marginTop: 10,
    marginBottom: 10, // Add spacing around the FlatList
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 15,
    margin: 8,
  },
});
