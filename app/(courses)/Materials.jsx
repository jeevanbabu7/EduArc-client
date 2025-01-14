import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import MaterialCard from '../../components/MaterialCard';

function Materials() {
  return (
    <>
      <FlatList
        style={styles.cardContainer}
        data={[
          { key: 'Module 1' },
          { key: 'Module 2' },
          { key: 'Module 3' },
          { key: 'Module 4' },
          { key: 'Module 5' },
          { key: 'Module 6' },
          { key: 'Module 7' }
        ]}
        renderItem={({ item }) => (
          <MaterialCard
            title={item.key}
            onPress={() => router.push('(courses)/Materials')}
          />
        )}
        keyExtractor={(item) => item.key}
      />
    </>
    
  )
}
export default Materials

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    marginBottom: 10, // Add spacing around the FlatList
  }
})