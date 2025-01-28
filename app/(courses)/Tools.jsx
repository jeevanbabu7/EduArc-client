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
        <View className="flex flex-colpt-10">
            <View className="flex flex-col gap-4 justify-center">
              <View className="flex flex-row gap-2">
                  <View className="flex-1">
                    <Tool title={'Chatbot'} iconSource={bot} onPress={() => router.push('/Chatbot')} />
                  </View>
                  <View className="flex-1">
                    <Tool title={'Upload'} iconSource={upload} onPress={() => router.push('/Upload')}/>
                  </View>
                </View>
              <View className="flex flex-row gap-2">
                  <View className="flex-1">
                    <Tool title={'Summary'} iconSource={summarise} onPress={() => router.push('/Summarise')}/>
                  </View>
                  <View className="flex-1">
                    <Tool title={'Video Summary'} iconSource={video} onPress={() => router.push('/VideoSummary')}/>
                  </View>
              </View>

              <View className="flex flex-row gap-2">
                  <View className="flex-1">
                    <Tool title={'Quizes'} iconSource={quiz} onPress={() => router.push('(quiz)/quizhomescreen')}/>
                  </View>
                  <View className="flex-1">
                    <Tool title={'Flash Card'} iconSource={flash} onPress={() => router.push('(flashcard)/flashcardhome')}/>
                  </View>
              </View>
              <View className="flex flex-row gap-2">
                  <View className="flex-1">
                    <Tool title={'QP Analysis'} iconSource={analysis} onPress={() => router.push('(qp)/QpAnalysis')}/>
                  </View>
                  <View className="flex-1">
                  <Tool title={'QP Prediction'} iconSource={prediction} onPress={() => router.push('(qp)/QpPrediction')}/>
                  </View>
              </View>
              
            </View>
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
    padding: 15,  
    backgroundColor:'#ffff',
    borderWidth:1,
    borderColor:'white',
    shadowColor: '#00126b', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,

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