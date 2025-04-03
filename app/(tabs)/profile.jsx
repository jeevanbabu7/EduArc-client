import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useUser } from '../../context/userContext';

const Profile = () => {
  const {currentUser, logout} = useUser();
  console.log(currentUser);
  
  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => logout(),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Profile</Text>
      </View>
      
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{currentUser.name}</Text>
          <Text style={styles.userRole}>Student</Text>
          <View style={styles.userLocationRow}>
            <Text style={styles.locationText}>San Francisco, CA</Text>
          </View>
        </View>
      </View>
      
      {/* Account Summary */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Account Info</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{currentUser.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Member Since</Text>
          <Text style={styles.infoValue}>
  {new Date(currentUser.$createdAt).toISOString().split('T')[0]}
</Text>

        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Last Login</Text>
<Text style={styles.infoValue}>
  {new Date(currentUser.accessedAt)?.toISOString()?.split('T')[0]}
</Text>

        </View>
      </View>
      
      {/* Preferences */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Dark Mode</Text>
          <View style={styles.togglePlaceholder}></View>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Notifications</Text>
          <View style={styles.togglePlaceholder}></View>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Data Saving</Text>
          <View style={styles.togglePlaceholder}></View>
        </View>
      </View>
      
      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.logoutButton]} 
          onPress={handleLogout}
        > 
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F9FF',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  profileCard: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  userLocationRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#888',
  },
  infoCard: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#666',
  },
  togglePlaceholder: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  actionsContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'column',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#4a6dff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  logoutButtonText: {
    color: '#ff6b6b',
    fontWeight: '600',
    fontSize: 14,
  }
});