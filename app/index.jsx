import { Text, View, StyleSheet,Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect,useRouter,Link } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import bot from '../assets/images/bot.jpg'
import CustomButton from '../components/CustomButton'

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container1}>
        <CustomButton title='Get Started' handlePress={()=> router.push('(tabs)/home')}/>
          <Text style={{marginTop:10}} onPress={()=> router.push('(auth)/signin')}>SginIn</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'grey'
  },
  text: {
    color: 'black',
    fontSize:50,
    //fontStyle:'bold'
  },
  container2:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:'4',
    backgroundColor:'#fff1' 
  },
  image1:{
    width:300,
    height:300

  }
});
