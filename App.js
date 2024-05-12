import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import {database} from "./BackEnd/db/database";

import Layout from './scr/app/Layout/layout';


import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import {Asset} from 'expo-asset';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite/next';



 export default function App() {

  return (
    <Layout/>
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

