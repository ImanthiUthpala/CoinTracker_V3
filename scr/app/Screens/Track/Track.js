import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SafeAreaProvider } from 'react-native-safe-area-context';


import {Income} from "./Income";
import {Expense} from "./Expense";
import { Source } from './Source';
import {AddSource} from './AddSource';
import {UpdateSource} from './UpdateSource';
import {AddIncome} from './AddIncome';
import {UpdateIncome} from './UpdateIncome';


const TrackTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function SourceStack(){
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen
        name="SourceStack"
        component={Source}
        options={{
          headerShown:true
        }}
        />
      <Stack.Screen
        name="AddSource"
        component={AddSource}
        options={{
          presentation:'modal',
          headerShown:true
          }
        }
        />
        <Stack.Screen
        name="UpdateSource"
        component={UpdateSource}
        options={{
          presentation:'modal',
          headerShown:true
          }
        }
        />
         <Stack.Screen
        name="AddIncome"
        component={AddIncome}
        options={{
          presentation:'modal',
          headerShown:true
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
        name="IncomeStack"
        component={Income}
        options={{
          headerShown:false
        }}
        />
      <Stack.Screen
        name="Source"
        component={SourceStack}
        options={{
          presentation:'modal',
          headerShown:false
          }
        }
        />
         <Stack.Screen
        name="UpdateIncome"
        component={UpdateIncome}
        options={{
          presentation:'modal',
          headerShown:true
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


