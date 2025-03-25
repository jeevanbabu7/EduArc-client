import { StyleSheet, Text, View, ScrollView,Alert } from 'react-native';
import React,{ useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import Tool from '../../components/Tool';
import bot from '../../assets/icons/bot.png';
import upload from '../../assets/icons/upload.png';
import summarise from '../../assets/icons/summarise.png';
import flash from '../../assets/icons/flash.png';
import analysis from '../../assets/icons/analysis.png';
import prediction from '../../assets/icons/prediction.png';
import quiz from '../../assets/icons/quiz.png';
import video from '../../assets/icons/video.png';

const Tools = () => {
  const params = useLocalSearchParams();
  const [course, setCourse] = useState(null);
  
  useEffect(() => {
    // Parse the course data from params
    if (params.courseData) {
        try {
          const courseData = JSON.parse(params.courseData);
          setCourse(courseData);
          console.log("Received course data in tools:", courseData);
        } catch (error) {
          console.error("Error parsing course data:", error);
          Alert.alert("Error", "Could not load course information");
        }
      }
    }, []);
    const navigateWithCourse = (path) => {
      router.push({
        pathname: path,
        params: { courseData: JSON.stringify(course) }, // Pass course data
      });
    };
    return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.toolContainer}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Explore Our Tools</Text>
        </View>
        <View className="flex flex-col pt-10">
          <View className="flex flex-col gap-4 justify-center">
            <View className="flex flex-row gap-2">
              <View className="flex-1">
                <Tool title={'Chatbot'} iconSource={bot} onPress={() => navigateWithCourse('/Chatbot')} />
              </View>
              <View className="flex-1">
                <Tool title={'Upload'} iconSource={upload} onPress={() => navigateWithCourse('/Upload')} />
              </View>
            </View>
            <View className="flex flex-row gap-2">
              <View className="flex-1">
                <Tool title={'Summary'} iconSource={summarise} onPress={() => navigateWithCourse('/Summarise')} />
              </View>
              <View className="flex-1">
                <Tool title={'Video Summary'} iconSource={video} onPress={() => navigateWithCourse('/VideoSummary')} />
              </View>
            </View>
            <View className="flex flex-row gap-2">
              <View className="flex-1">
                <Tool title={'Quizes'} iconSource={quiz} onPress={() => navigateWithCourse('(quiz)/quizhomescreen')} />
              </View>
              <View className="flex-1">
                <Tool title={'Flash Card'} iconSource={flash} onPress={() => navigateWithCourse('(flashcard)/flashcardhome')} />
              </View>
            </View>
            <View className="flex flex-row gap-2">
              <View className="flex-1">
                <Tool title={'QP Analysis'} iconSource={analysis} onPress={() => navigateWithCourse('(qp)/QpAnalysis')} />
              </View>
              <View className="flex-1">
                <Tool title={'QP Prediction'} iconSource={prediction} onPress={() => navigateWithCourse('(qp)/QpPrediction')} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Tools;

const styles = StyleSheet.create({
  toolContainer: {
    minHeight: '100%',
    padding: 15,
    backgroundColor: '#ffff',
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#00126b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tools: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 10,
  },
});
