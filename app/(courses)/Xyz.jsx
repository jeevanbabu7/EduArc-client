import React from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProgressTracker = () => {
  // Mock Data
  const totalHours = 12; // Total hours spent
  const quizzesAttempted = 8; // Total quizzes attempted
  const dailyStreak = 5; // Consecutive days
  const flashcardsLearned = 50; // Flashcards studied
  const completionPercentage = 0.75; // 75% Course Completion

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Progress</Text>
        <Text style={styles.headerSubtitle}>Keep up the good work!</Text>
      </View>

      <View style={styles.statsContainer}>
        {/* Learning Hours */}
        <View style={styles.statBox}>
          <View style={styles.iconContainer}>
            <Ionicons name="time-outline" size={22} color="#fff" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{totalHours} hrs</Text>
            <Text style={styles.statTitle}>Total Hours</Text>
          </View>
        </View>

        {/* Quizzes Attempted */}
        <View style={styles.statBox}>
          <View style={[styles.iconContainer, { backgroundColor: '#4a6fa1' }]}>
            <FontAwesome5 name="clipboard-list" size={20} color="#fff" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{quizzesAttempted}</Text>
            <Text style={styles.statTitle}>Quizzes</Text>
          </View>
        </View>

        {/* Daily Streak */}
        <View style={styles.statBox}>
          <View style={[styles.iconContainer, { backgroundColor: '#2d5f8b' }]}>
            <Ionicons name="flame-outline" size={22} color="#fff" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{dailyStreak}</Text>
            <Text style={styles.statTitle}>Day Streak</Text>
          </View>
        </View>

        {/* Flashcards Learned */}
        <View style={styles.statBox}>
          <View style={[styles.iconContainer, { backgroundColor: '#1d3e67' }]}>
            <Ionicons name="book-outline" size={22} color="#fff" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{flashcardsLearned}</Text>
            <Text style={styles.statTitle}>Flashcards</Text>
          </View>
        </View>
      </View>
      {/* Motivational Message */}
      <View style={styles.motivationBox}>
        <View style={styles.motivationGradient}>
          <Ionicons name="rocket-outline" size={20} color="#4a6fa1" style={styles.motivationIcon} />
          <Text style={styles.motivationText}>
            You're making excellent progress!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProgressTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor:'white'
  },
  header: {
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f2942',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#4a6fa1',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#1d3e67',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#3a7bd5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContent: {
    marginLeft: 12,
  },
  statTitle: {
    fontSize: 14,
    color: '#4a6fa1',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f2942',
    marginBottom: 2,
  },
  progressSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#1d3e67',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f2942',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3a7bd5',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e1e8ef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3a7bd5',
    borderRadius: 4,
  },
  motivationBox: {
    borderRadius: 16,
    overflow: 'hidden',
    // backgroundColor:'blue'
  },
  motivationIcon: {
    marginRight: 8,
  },
  motivationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a6fa1',
  },
  motivationGradient:{
    flexDirection:'row',
    justifyContent:'center'
  }
});