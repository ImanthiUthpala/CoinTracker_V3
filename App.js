import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Screen } from 'react-native-screens';

import 'react-native-gesture-handler';

import {Home} from "./scr/app/Home";
import {Track} from "./scr/app/Track/Track";
import {Plan} from "./scr/app/Plan/Plan";
import {Report} from "./scr/app/Report";
import {Tips} from "./scr/app/Tips";

import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import {Asset} from 'expo-asset';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite/next';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TrackTab = createMaterialTopTabNavigator();
const PlanTab = createMaterialTopTabNavigator();


const loadDatabase = async () => {
  const dbName = "CoinTracker.db";                           //just a name
  const dbAsset = require("./assets/CoinTracker3.db");        //actual name
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  try {
    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    if (!fileInfo.exists) {
      // Ensure directory exists
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`, // Corrected directory path
        { intermediates: true }
      );
      // Download the database file
      await FileSystem.downloadAsync(dbUri, dbFilePath);
    }
  } catch (error) {
    console.error("Error loading database:", error);
  }
};

 export default function App() {

  const [dbLoaded, setDbLoaded] = React.useState(false);

  React.useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e)=> console.error(e));
  }, []);

  if (!dbLoaded) 
  return (
   <View>
    <Text>Loading...</Text>
  </View>
 
  );

  return (
    <NavigationContainer>
      <React.Suspense
      fallback={
        <View style={{flex:1}}>
          <ActivityIndicator size={"large"}/>
          <Text>Loading Database...</Text>
        </View>
      }>
        <SQLiteProvider databaseName='CoinTracker3.db' useSuspense>
      <Tab.Navigator>

      <Tab.Screen name="Home" component={Home} options={{title:'Home' ,headerTitleAlign:'center',tabBarIcon:({color, size})=>(
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
    
    </SQLiteProvider>
    </React.Suspense>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

