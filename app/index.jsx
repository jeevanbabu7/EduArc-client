import { Text, View, StyleSheet,Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect,useRouter,Link } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import bot from '../assets/images/bot.jpg'
import CustomButton from '../components/CustomButton'
import "./global.css"
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../components/OnboardingScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import home from '../app/(tabs)/home'
import { getItem } from '../scripts/asyncStorage';
const Stack = createStackNavigator();

export default function Index() {

  const [showOnboarding,setShowOnboarding] = useState(null);
  const router = useRouter();
  useEffect(()=>{
    checkIfAlreadyOnboarded();
  },[])

  const checkIfAlreadyOnboarded = async ()=>{
    let onboarded = await getItem('onboarded');
    if(onboarded==1){
      //hide onboarding screen
      setShowOnboarding(false);
    }
    else{
      //show onboarding screen
      setShowOnboarding(true);
    }
  }

  if(showOnboarding==null){
    return null;
  }
  if(showOnboarding){
    return (

      <Stack.Navigator initialRouteName='OnboardingScreen'>
        <Stack.Screen name='OnboardingScreen' options = {{headerShown:false}} component={OnboardingScreen}/>
        <Stack.Screen name='home' options = {{headerShown:false}} component={home} style={styles.container1}/>
      </Stack.Navigator>
    

    // <SafeAreaView style={styles.container1}>
    //     <CustomButton title='Get Started' handlePress={()=> router.push('(tabs)/home')}/>
    //       <Text style={{marginTop:10}} onPress={()=> router.push('(auth)/signin')}>SginIn</Text>
    // </SafeAreaView>
  );
  }
  else{
    return (

      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='OnboardingScreen' options = {{headerShown:false}} component={OnboardingScreen}/>
        <Stack.Screen name='home' options = {{headerShown:false}} component={home} style={styles.container1}/>
      </Stack.Navigator>
    

    // <SafeAreaView style={styles.container1}>
    //     <CustomButton title='Get Started' handlePress={()=> router.push('(tabs)/home')}/>
    //       <Text style={{marginTop:10}} onPress={()=> router.push('(auth)/signin')}>SginIn</Text>
    // </SafeAreaView>
  );
  }
  
}

const styles = StyleSheet.create({
  container1: {
  
    // flex: 1,
    // backgroundColor: '#fff',
    // // alignItems: 'center',
    // // justifyContent: 'center',
    // backgroundColor:'grey',
    // marginTop:0,
  },
  text: {
    color: 'black',
    fontSize:50,
    //fontStyle:'bold'
  },
  // container2:{
  //   flex:1,
  //   justifyContent:'center',
  //   alignItems:'center',
  //   paddingHorizontal:'4',
  //   backgroundColor:'#fff1' 
  // },
  image1:{
    width:300,
    height:300

  }
});
