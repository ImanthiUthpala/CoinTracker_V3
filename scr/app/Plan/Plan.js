import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {Budget} from "./Budget";
import {Bill_Reminder} from "./Bill_Reminder";
import {Goal} from "./Goal";


const PlanTab = createMaterialTopTabNavigator();

export const Plan = () => {
  return (
      <PlanTab.Navigator>
          <PlanTab.Screen name="Budget" component={Budget} />
          <PlanTab.Screen name="Reminder" component={Bill_Reminder} />
          <PlanTab.Screen name="Goal" component={Goal} />

      </PlanTab.Navigator>
  );
};
