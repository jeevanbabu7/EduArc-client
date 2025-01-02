import { View, Text,Image ,StyleSheet,ScrollView,FlatList} from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Tool from '../../components/Tool'
import bot from '../../assets/icons/bot.png'
import upload from '../../assets/icons/upload.png'
import summarise from '../../assets/icons/summarise.png'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
const Home = () => {
  return (
    <>
    
      <View style={styles.topbar}>
        <Ionicons name="menu" size={22} color="#4F8EF7" />
        <Text style={{ fontWeight: 'bold',fontSize:20}}>EduArc</Text>
        <Ionicons name="notifications" size={20} color="#4F8EF7" />
      </View> 
      <View style={styles.welcome}>
        <Text style={{fontSize: 18}}>Welcome Back,</Text>
        <Text style={{fontSize: 18,fontWeight: 'bold'}}>User</Text>
      </View>
      <View style={styles.toolContainer}>
        <View><Text style={{fontSize: 18,fontWeight:'bold',marginBottom:10}}>Explore Our Tools</Text></View>
        <View style={styles.tools}>
            <Tool title={'Chatbot'} iconSource={bot}/>
            <Tool title={'Upload'} iconSource={upload}/>
            <Tool title={'Summarise'} iconSource={summarise}/>
        </View>
      </View>
      <View><Text style={{fontSize: 18,fontWeight: 'bold',padding:10}}>Recent Courses</Text></View>

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
            <View style={styles.card}>
                <Text style={styles.item}>{item.key}</Text>
            </View>
        }
      />
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
    backgroundColor:'#ffff'

    // backgroundColor:'grey',
  },
  scroll:{
    // backgroundColor:'grey',
    padding:10,
    flex:1,
    gap:10,
    backgroundColor:'#ffff'

  },
  welcome:{
    flexDirection:'column',
    padding:10,
    backgroundColor:'#ffff'

  },
  toolContainer:{
    flex:1,
    padding:10,
    backgroundColor:'#ffff'

    // backgroundColor:'grey'
  },
  tools:{
    flexDirection:'row',
    gap:15,
    paddingTop:10,
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