import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {Income} from "./Income";
import {Expense} from "./Expense";


const TrackTab = createMaterialTopTabNavigator();


export const Track = () => {
  return (
      <TrackTab.Navigator>
      <TrackTab.Screen name="Income" component={Income} />
      <TrackTab.Screen name="Expense" component={Expense} />
    </TrackTab.Navigator>

    
  );
}



//export default Track;
/*export const Track = () => {
  // ... Your Home screen component code
};*/
