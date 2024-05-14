import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Income} from "./Income";
import {Expense} from "./Expense";
import { Source } from './Source';


const TrackTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const IncomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Income" component={Income} options={{ headerShown: false }} />
    <Stack.Screen name="Source" component={Source}  />
  </Stack.Navigator>
);

const TrackStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="TrackTabs" component={Track} options={{ headerShown: false }} />
    <Stack.Screen name="Source" component={Source} />
  </Stack.Navigator>
);

export const Track = () => {
  return (
      <TrackTab.Navigator>
      <TrackTab.Screen name="Income" component={Income} />
      <TrackTab.Screen name="Expense" component={Expense} />
    </TrackTab.Navigator>
    
    
       
      
  );
}

 /*<Stack.Navigator>
          <Stack.Screen name="Source" component={Source} />
        </Stack.Navigator> */

//export default Track;
/*export const Track = () => {
  // ... Your Home screen component code
};*/
