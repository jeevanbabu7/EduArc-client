import { View, Text,Image ,StyleSheet,ScrollView,FlatList,SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Tool from '../../components/Tool'
import Card from '../../components/CardWithOverflowImage'
import CourseCard from '../../components/CourseCard';
import bot from '../../assets/icons/bot.png'
import upload from '../../assets/icons/upload.png'
import summarise from '../../assets/icons/summarise.png'
import more from '../../assets/icons/more.png'
import { useNavigation, useRouter,router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { removeItem } from '../../scripts/asyncStorage';
import { InputGroup, InputField, InputLeftAddon, Input } from "@gluestack-ui/themed";
import { useUser } from '../../context/userContext';

const primary = '#ffff';
const Home = () => {
  const router = useRouter();
  const {user} = useUser()  
  console.log(user);
  
  
  
  return (
    <ScrollView>
      <SafeAreaView style={{flex:1,backgroundColor: "#F5F9FF"}}>
      <View className="bg-[#4D75F9]" style={styles.topContainer}>
        <View style={styles.topbar}>
          <Ionicons name="menu" size={25} color="#FFFFFF" />
          <Text style={{ fontWeight: 'bold',fontSize:20, color: "#FFFFFF"}}>EduArc</Text>
          <Ionicons name="notifications" size={25} color="#00000" />
        </View> 
        <View style={styles.welcome}>
          <Text style={{fontSize: 18,fontWeight: 'bold', color: "#FFFFFF"}}>Welcome Back,</Text>
          <Text style={{fontSize: 18,fontWeight: 'bold', color: "#FFFFFF"}}>{user}</Text>
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
                <Tool title={'More'} iconSource={more}/>
                </View>
              </View>
          </View>
        {/* <Text className="text-red-400">Hii</Text> */}
        
      </View>
      <View style={styles.courselist}>
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
    // borderWidth:1,
    // borderColor:'white',
    // shadowColor: '#000', // Shadow for iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5, // Shadow for Android
    marginHorizontal:10
  },
  topContainer: {
    borderBottomLeftRadius: 40, 
    borderBottomRightRadius: 40,
  }
})