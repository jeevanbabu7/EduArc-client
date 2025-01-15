import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const QuizHome = () => {
  const router = useRouter();
  const topics = [
    { id: '1', title: 'Math' },
    { id: '2', title: 'Science' },
    { id: '3', title: 'History' },
    { id: '4', title: 'Technology' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Topic</Text>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.topicButton}
            onPress={() => router.push(`/quizscreen?topic=${item.title}`)}
          >
            <Text style={styles.topicText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  topicButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  topicText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizHome;
