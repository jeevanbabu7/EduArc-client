import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CourseCard = (title) => {
  return (
    <TouchableOpacity style={styles.button}>
        <View style={styles.card}>
            <Text style={styles.item}>{title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default CourseCard

const styles = StyleSheet.create({
    
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      card:{
        backgroundColor: '#ffff',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        paddingVertical:15,
        margin: 8,
    
      },
      cardContainer:{
        flex:1,
        backgroundColor:'#ffff'
      }
})