import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { database } from "./BackEnd/db/database";

import Layout from './scr/app/Layout/layout';
import { DatabaseProvider } from './BackEnd/db/DatabaseContext.js';


import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from 'expo-asset';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite/next';



export default function App() {

  return (
    <DatabaseProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Layout />
      </GestureHandlerRootView>
       
    </DatabaseProvider>

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

