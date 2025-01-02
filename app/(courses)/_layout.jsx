import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Materials from './Materials';
import Tools from './Tools';
import Xyz from './Xyz';


const Tab = createMaterialTopTabNavigator();

export default function CourseLayout() {
  return (
    <>
    <View style={styles.title}>
      <Text style={{fontSize: 18,fontWeight: 'bold'}}>Data Structures</Text>
    </View>
    <Tab.Navigator>
      <Tab.Screen name="Materials" component={Materials} />
      <Tab.Screen name="Tools" component={Tools} />
      <Tab.Screen name="Xyz" component={Xyz} />
    </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  title:{
    flexDirection:'row',
    justifyContent:'center',
    padding:15,
    backgroundColor:'white'
  },
})