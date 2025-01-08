import { View, Text,Image ,StyleSheet,ScrollView,FlatList} from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Tool from '../../components/Tool'
import Card from '../../components/CardWithOverflowImage'
import CourseCard from '../../components/CourseCard';
import bot from '../../assets/icons/bot.png'
import upload from '../../assets/icons/upload.png'
import summarise from '../../assets/icons/summarise.png'
import more from '../../assets/icons/more.png'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
const Home = () => {
  return (
    <>
      <ScrollView style={{backgroundColor:'#e6e6fa'}}>
      <View style={styles.topbar}>
        <Ionicons name="menu" size={22} color="#800080" />
        <Text style={{ fontWeight: 'bold',fontSize:20,color:'#800080'}}>EduArc</Text>
        <Ionicons name="notifications" size={20} color="#800080" />
      </View> 
      <View style={styles.welcome}>
        <Text style={{fontSize: 18,fontWeight: 'bold'}}>Welcome Back,</Text>
        <Text style={{fontSize: 18,fontWeight: 'bold'}}>User</Text>
      </View>
      <View><Card/></View>
      <View style={styles.toolContainer}>
        <View><Text style={{fontSize: 18,fontWeight:'bold',color:'#800080',marginBottom:10}}>Explore Our Tools</Text></View>
        <View style={styles.tools}>
            <Tool title={'Chatbot'} iconSource={bot}/>
            <Tool title={'Upload'} iconSource={upload}/>
            <Tool title={'Summary'} iconSource={summarise}/>
            <Tool title={'More'} iconSource={more}/>

        </View>
      </View>
      <View style={styles.courselist}>
        <View><Text style={{fontSize: 18,fontWeight:'bold',color:'#800080',margin:10}}>Recent Courses</Text></View>
        <FlatList
          style={styles.cardContainer}
          data={[
            {key: 'Data Structures'},
            {key: 'Operating Systems'},
            {key: 'Alin Jose Perera'},
            {key: 'Arattu Annan'},
            {key: 'kimboy'},


          ]}
          renderItem={({item}) =>
              // <View style={styles.card}>
              //     <Text style={styles.item}>{item.key}</Text>
              // </View>
              <CourseCard title={item.key}/>
          }
        />
      </View>
      
      </ScrollView>
    </>
  )
}

export default Home
const styles = StyleSheet.create({
  topbar:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    maxHeight:'70',
    alignItems:'center',
    padding:'20',
    backgroundColor:'#e6e6fa'

    // backgroundColor:'grey',
  },
  // scroll:{
  //   backgroundColor:'#e6e6fa',
  //   padding:10,
  //   flex:1,
  //   gap:10,
  // },
  welcome:{
    flexDirection:'column',
    padding:10,
    backgroundColor:'#e6e6fa'

  },
  toolContainer:{
    flex:1,
    margin:10,  
    padding:10,  
    backgroundColor:'#e6e6fa',
    borderWidth:1,
    borderColor:'white',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  tools:{
    flexDirection:'row',
    // justifyContent:'space-evenly',
    gap:15,
    paddingTop:10,
    // backgroundColor:'grey'
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
    backgroundColor:'#e6e6fa'
  },
  courselist:{
    backgroundColor:'#e6e6fa',
    borderWidth:1,
    borderColor:'white',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
    margin:10
  }
})