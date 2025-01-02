import { View, Text,StyleSheet,FlatList } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CourseCard from '../../components/CourseCard';
import { Redirect,useRouter,router,Link } from 'expo-router';
const Learn = () => {
  return (
    <>
        <View style={styles.topbar}>
            <Text style={{fontSize: 18,fontWeight: 'bold'}}>My Courses</Text>
            <Ionicons name="menu" size={22} color="#4F8EF7"  />
        </View>
        <FlatList
        style={styles.cardContainer}
        data={[
          {key: 'Data Structures'},
          {key: 'Operating Systems'},
          {key: 'Linear Algebra'},
          {key: 'Commerce'},
          {key: 'Maths'},
          {key: 'Science'},
          
        ]}
        renderItem={({item}) =>
            <View style={styles.card} >
                <Text style={styles.item} onPress={()=> router.push('(courses)/Materials')}>{item.key}</Text>
            </View>
        }
      />
    </>
  )
}

export default Learn
const styles = StyleSheet.create({
topbar:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    maxHeight:'70',
    alignItems:'center',
    padding:'20',
    backgroundColor:'#ffff'
    },
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
