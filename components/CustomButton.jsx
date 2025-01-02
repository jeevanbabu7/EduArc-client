import {TouchableOpacity,Text,StyleSheet } from 'react-native'
import React from 'react'

const custombutton = ({title,handlePress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={{color:'white'}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default custombutton
const styles = StyleSheet.create({
    container:{
        // flex:1,
        // justifyContent:'center',
        borderRadius:25,
        backgroundColor:'black',
        padding:20,
        marginTop:50
    }
    
})