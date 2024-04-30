import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import 'react-native-gesture-handler';

import {Home} from "./scr/app/Home";
import {Track} from "./scr/app/Track/Track";
import {Plan} from "./scr/app/Plan/Plan";
import {Report} from "./scr/app/Report";
import {Tips} from "./scr/app/Tips";



//const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TrackTab = createMaterialTopTabNavigator();
const PlanTab = createMaterialTopTabNavigator();

 function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon:({color, size})=>(
        <FontAwesome5 name="home" size={24} color="black" />
      )}} />
      <Tab.Screen name="Track" component={Track} options={{tabBarIcon:({color, size})=>(
        <FontAwesome5 name="money-check" size={24} color="black" />
      )}} />
      <Tab.Screen name="Plan" component={Plan} options={{tabBarIcon:({color, size})=>(
        <FontAwesome5 name="pen-alt" size={24} color="black" />
      )}} />
      <Tab.Screen name="Report" component={Report} options={{tabBarIcon:({color, size})=>(
        <FontAwesome5 name="chart-line" size={24} color="black" />
      )}}/>
      <Tab.Screen name="Tips" component={Tips} options={{tabBarIcon:({color, size})=>(
        <FontAwesome5 name="lightbulb" size={24} color="black" />      )}}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

