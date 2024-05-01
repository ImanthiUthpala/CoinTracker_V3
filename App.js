import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
//import { Screen } from 'react-native-screens';

import 'react-native-gesture-handler';

import {Home} from "./scr/app/Home";
import {Track} from "./scr/app/Track/Track";
import {Plan} from "./scr/app/Plan/Plan";
import {Report} from "./scr/app/Report";
import {Tips} from "./scr/app/Tips";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TrackTab = createMaterialTopTabNavigator();
const PlanTab = createMaterialTopTabNavigator();

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}




 function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator options={{headerTitleAlign:'center'}}
       >
      <Tab.Screen name="Home" component={Home} options={{title:'Home' ,headerTitleAlign:'center' ,tabBarIcon:({color, size})=>(
        <FontAwesome5 name="home" size={24} color="black" />
      )}} />
      <Tab.Screen name="Track" component={Track} options={{title:'Track' ,headerTitleAlign:'center' ,tabBarIcon:({color, size})=>(
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

