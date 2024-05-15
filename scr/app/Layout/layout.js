import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';

import {Home} from "../Screens/Home";
import {Track} from "../Screens/Track/Track";
import {Plan} from "../Screens/Plan/Plan";
import {Report} from "../Screens/Report";
import {Tips} from "../Screens/Tips";
import {Income} from "../Screens/Track/Income";
import {Source} from "../Screens/Track/Source";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TrackTab = createMaterialTopTabNavigator();
const PlanTab = createMaterialTopTabNavigator();



export default function Layout() {
  return(
    <SafeAreaProvider>
    <NavigationContainer>
      
    <Tab.Navigator>

    <Tab.Screen name="Home" component={Home} options={{title:'Home' ,headerTitleAlign:'center',tabBarIcon:({color, size})=>(
      <FontAwesome5 name="home" size={24} color="black" />
    )}} />
    <Tab.Screen name="Track" component={Track} options={{title:'Track' ,headerTitleAlign:'center',tabBarIcon:({color, size})=>(
      <FontAwesome5 name="money-check" size={24} color="black" />
    )}} />
    <Tab.Screen name="Plan" component={Plan} options={{title:'Plan' ,headerTitleAlign:'center' ,tabBarIcon:({color, size})=>(
      <FontAwesome5 name="pen-alt" size={24} color="black" />
    )}} />
    <Tab.Screen name="Report" component={Report} options={{title:'Report' ,headerTitleAlign:'center' ,tabBarIcon:({color, size})=>(
      <FontAwesome5 name="chart-line" size={24} color="black" />
    )}}/>
    <Tab.Screen name="Tips" component={Tips} options={{title:'Tips' ,headerTitleAlign:'center' ,tabBarIcon:({color, size})=>(
      <FontAwesome5 name="lightbulb" size={24} color="black" />      )}}/>
  </Tab.Navigator>
  
 
  </NavigationContainer>
  </SafeAreaProvider>
  );
}