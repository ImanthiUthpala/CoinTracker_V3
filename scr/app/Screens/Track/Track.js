import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';


import {Income} from "./Income";
import {Expense} from "./Expense";
import { Source } from './Source';
import {AddSource} from './AddSource';


const TrackTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function SourceStack({navigation}){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Source"
        component={Source}
        options={{
          headerShown:false
        }}
        />
      <Stack.Screen
        name="AddSource"
        component={AddSource}
        options={{
          presentation:'modal',
          headerShown:true,
          headerTitle: 'Add Source',
          }
        }
        />
    </Stack.Navigator>
  );
}

function IncomeStack(){
  return(
    <Stack.Navigator >
      <Stack.Screen
        name="IncomeScreen"
        component={Income}
        options={{
          headerShown:true,
          headerTile: 'Income',
          
        }}
        />
      <Stack.Screen
        name="SourceStack"
        component={SourceStack}
        options={({route}) =>{
          //Dynamically determine if the AddSource screen is shown
          const isAddSource = route.state?.routes.some(r => r.name === 'AddSource');
          return {
            headerShown: true,
            headerTitle: isAddSource ? 'Add Source' : 'Source',
          };
        }
        }
        />
    </Stack.Navigator>
  );
}


export const Track = () => {
  return (
    <SafeAreaProvider>
      <TrackTab.Navigator>
      <TrackTab.Screen name="Income" component={IncomeStack} />
      <TrackTab.Screen name="Expense" component={Expense} />

      

    </TrackTab.Navigator>
    
    </SafeAreaProvider>
       
      
  );
}


