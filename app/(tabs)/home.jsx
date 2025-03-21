import { View, Text,Image ,StyleSheet,ScrollView,FlatList,SafeAreaView, TouchableOpacity,Dimensions } from 'react-native'
import React, { useRef, useCallback,useState } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Tool from '../../components/Tool'
import Card from '../../components/CardWithOverflowImage'
import CourseCard from '../../components/CourseCard';
import bot from '../../assets/icons/bot.png'
import upload from '../../assets/icons/upload.png'
import summarise from '../../assets/icons/summarise.png'
import more from '../../assets/icons/more.png'
import reading from '../../assets/icons/reading-book.png'
import flash from '../../assets/icons/flash.png'
import { useNavigation, useRouter,router } from 'expo-router';
import { InputGroup, InputField, InputLeftAddon, Input } from "@gluestack-ui/themed";
import { useUser } from '../../context/userContext';
import RBSheet from 'react-native-raw-bottom-sheet';
const primary = '#ffff';
const Home = () => {
  const router = useRouter();
  const {currentUser} = useUser();
  const refRBSheet = useRef(null);
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const notifications = [
    { id: '1', title: 'New Course Added', message: 'You have a new course available: React Native Basics' },
    { id: '2', title: 'Assignment Due', message: 'Your "Data Structures" assignment is due tomorrow.' },
    { id: '3', title: 'Live Class Reminder', message: 'Join the live class for "Machine Learning" at 5 PM today.' },
    { id: '4', title: 'Profile Update', message: 'Your profile details were successfully updated.' },
  ];

  return (
    <ScrollView style={{backgroundColor: "#F5F9FF"}}>
      <SafeAreaView style={{flex:1,backgroundColor: "#F5F9FF"}}>
      <View className="bg-[#4D75F9]" style={styles.topContainer}>
        <View style={styles.topbar}>
          {/* <Ionicons name="menu" size={25} color="#FFFFFF" /> */}
          <Text style={{ fontWeight: 'bold',fontSize:20, color: "#FFFFFF"}}>EduArc</Text>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <Ionicons name="notifications" size={25} color="#ffff"  />
          </TouchableOpacity>
        </View> 
        <RBSheet
          ref={refRBSheet}
          draggable={true}
          closeOnPressMask={true}
          animationType="slide"
          onClose={() => setTimeout(() => console.log('Sheet Closed'), 100)}
          customStyles={{
            wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' }, // Dim background
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              backgroundColor: '#fff',
              height: '100%'
            },
            draggableIcon: { backgroundColor: '#000' },
          }}
        >
          <Text style={styles.notificationHeader}>Notifications</Text>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
              </View>
            )}
          />
          <TouchableOpacity onPress={() => refRBSheet.current.close()} style={{ marginTop: 20, alignSelf: 'center' }}>
            <Text style={{ color: 'blue' }}>Close</Text>
          </TouchableOpacity>
        </RBSheet>
        <View style={styles.welcome}>
          <Text style={{fontSize: 18,fontWeight: 'bold', color: "#FFFFFF"}}>Welcome Back,</Text>
          <Text style={{fontSize: 18,fontWeight: 'bold', color: "#FFFFFF"}}>{currentUser?.name}</Text>
        </View>
        <View className="flex flex-row justify-center items-center h-32">
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isFocused={true}
            className="bg-white w-96  flex flex-row justify-center items-center rounded-xl"
            style={{ borderRadius: 20, height: 40 }}
          >
            <InputField 
              placeholder="Search.." 
              style={{ color: "black" }}   
            />
            <Ionicons 
              name="search" 
              size={20} 
              className="mr-4" 
            />
          </Input>

        </View>
      </View>
      {/* <View><Card/></View> */}

      
      <View style={styles.toolContainer} >
        <View><Text style={{fontSize: 18,fontWeight:'bold',marginBottom:10}}>Explore Our Tools</Text></View>
        <View className="flex flex-col gap-2">
          <View className="flex flex-row gap-2">
                <View className="flex-1">
                  <Tool
                    title={'Chatbot'}
                    iconSource={bot}
                    onPress={() => router.push('/Chatbot')}
                  />
                </View>
                <View className="flex-1">
                  <Tool
                    title={'Upload'}
                    iconSource={upload}
                    onPress={() => router.push('/Upload')}
                  />
                </View>
              </View>
              <View className="flex flex-row gap-2">
                <View className="flex-1">
                <Tool title={'Summary'} iconSource={summarise} onPress={() => router.push('/Summarise')}/>
                </View>
                <View className="flex-1">
                <Tool title={'FlashCards'} iconSource={flash} onPress={() => router.push('/(flashcard)/flashcardhome')}/> 
                </View>
              </View>
          </View>
      </View>
      {/* <View style={styles.courselist}>
        <View><Text style={{fontSize: 18,fontWeight:'bold',margin:10}}>Recent Courses</Text></View>
        <FlatList
        style={styles.cardContainer}
        data={[
          { key: 'Data Structures' },
          { key: 'Operating Systems' },
          { key: 'Alin Jose Perera' },
          { key: 'Arattu Annan' },
          { key: 'kimboy' },
        ]}
        renderItem={({ item }) => (
          <CourseCard
            title={String(item.key)}
            onPress={() => router.push(`(courses)/Materials`)} // Pass onPress handler
          />
        )}
        keyExtractor={(item) => item.key} // Add a keyExtractor for unique keys
        />

      </View> */}
      <View style={styles.emptyState}>
        <Image 
          source={reading} 
          style={styles.emptyImage} 
        />
        <Text style={styles.emptyText}>
          "Every expert was once a beginner. Start your learning journey today!"
        </Text>
        <TouchableOpacity style={styles.addcoursebutton} onPress={()=> router.push('learn')}>
          <Text style={{color:'white'}}>Add courses +</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default Home
const styles = StyleSheet.create({
  topbar:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    maxHeight:70,
    alignItems:'center',
    padding:10,
    backgroundColor: "transparent",
    // marginTop:30
    // backgroundColor:'grey',
  },
  welcome:{
    flexDirection:'column',
    padding:10,
    backgroundColor: "transparent",
    fontColor: "#FFFFFF",
    // backgroundColor:'#0504aa'


  },
  toolContainer:{
    
    marginHorizontal:10,  
    padding:10,  
    backgroundColor: "transparent",
    // borderWidth:1,
    // borderColor:'white',
    // shadowColor: '#00126b', // Shadow for iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5, // Shadow for Android
  },
  tools:{
    flexDirection:'row',
    // justifyContent:'space-evenly',
    gap:15,
    paddingVertical:10,
    // backgroundColor:'grey'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  cardContainer:{
    paddingBottom: 10,
    backgroundColor: "transparent",
  },
  courselist:{
    flex:1,
    backgroundColor:"transparent",
    marginHorizontal:10
  },
  topContainer: {
    borderBottomLeftRadius: 40, 
    borderBottomRightRadius: 40,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyImage: {
    width: 100, 
    height: 100, 
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  },
  notificationHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  notificationItem: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  addcoursebutton:{
    borderRadius:10,
    padding:10,
    marginTop:10,
    backgroundColor:'#015CE0'
  }
})