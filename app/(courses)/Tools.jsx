import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import Tool from '../../components/Tool'
import bot from '../../assets/icons/bot.png'
import upload from '../../assets/icons/upload.png'
import summarise from '../../assets/icons/summarise.png'
import flash from '../../assets/icons/flash.png'
import analysis from '../../assets/icons/analysis.png'
import prediction from '../../assets/icons/prediction.png'
import quiz from '../../assets/icons/quiz.png'
import video from '../../assets/icons/video.png'

const Tools = () => {
  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <View style={styles.toolContainer}>
        <View><Text style={{fontSize: 18,fontWeight:'bold',marginBottom:10}}>Explore Our Tools</Text></View>
        <View style={styles.tools}>
            <Tool title={'Chatbot'} iconSource={bot} onPress={() => router.push('/Chatbot')} />
            <Tool title={'Upload'} iconSource={upload} onPress={() => router.push('/Upload')}/>
            <Tool title={'Summary'} iconSource={summarise} onPress={() => router.push('/Summarise')}/>
            <Tool title={'Flash Card'} iconSource={flash} onPress={() => router.push('(quiz)/quizhomescreen')}/>
            <Tool title={'Quizes'} iconSource={quiz} onPress={() => router.push('(quiz)/quizhomescreen')}/>
            <Tool title={'Video Summary'} iconSource={video} onPress={() => router.push('(quiz)/quizhomescreen')}/>
            <Tool title={'QP Analysis'} iconSource={analysis}/>
            <Tool title={'QP Prediction'} iconSource={prediction}/>
        </View>
      </View>
    </ScrollView>
    
  )
}

export default Tools

const styles = StyleSheet.create({
  toolContainer:{
    // margin:10,
    minHeight:'100%',
    padding:10,  
    backgroundColor:'#f0f2ff',
    borderWidth:1,
    borderColor:'white',
    shadowColor: '#00126b', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  tools:{
    flexWrap:'wrap',
    flexDirection:'row',
    // justifyContent:'space-evenly',
    gap:15,
    paddingVertical:10,
    // backgroundColor:'grey'
  }
})