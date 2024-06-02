import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SafeAreaProvider } from 'react-native-safe-area-context';

import {Budget} from "./Budget";
import {Bill_Reminder} from "../Bill_Reminder";
import {Goal} from "./Goal";

import {UpdateCategory} from "../Track/UpdateCategory"
//import { Category } from '../Track/Category';
import { AddCategory } from '../Track/AddCategory';
import { AddBudget } from './AddBudget';
import { UpdateBudget } from './UpdateBudget';
import { BudgetCategory} from './BudgetCategory';


const PlanTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();


function BudgetCategoryStack(){
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen
        name="BudgetCategoryStack"
        component={BudgetCategory}
        options={{
          headerShown:true
        }}
        />
      <Stack.Screen
        name="AddCategory"
        component={AddCategory}
        options={{
          presentation:'modal',
          headerShown:true
          }
        }
        />
        <Stack.Screen
        name="UpdateCategory"
        component={UpdateCategory}
        options={{
          presentation:'modal',
          headerShown:true
          }
        }
        />
         <Stack.Screen
        name="AddBudget"
        component={AddBudget}
        options={{
          presentation:'modal',
          headerShown:true
          }
        }
        />
       
    </Stack.Navigator>
  );
}

function BudgetStack(){
  return(
    <Stack.Navigator >
      <Stack.Screen
        name="BudgetStack"
        component={Budget}
        options={{
          headerShown:false
        }}
        />
      <Stack.Screen
        name="BudgetCategory"
        component={BudgetCategoryStack}
        options={{
          presentation:'modal',
          headerShown:false
          }
        }
        />
         <Stack.Screen
        name="UpdateBudget"
        component={UpdateBudget}
        options={{
          presentation:'modal',
          headerShown:true
          }
        }
        />
    </Stack.Navigator>
  );
}

export const Plan = () => {
  return (
      <PlanTab.Navigator>
          <PlanTab.Screen name="Budget" component={BudgetStack} />
          <PlanTab.Screen name="Reminder" component={Bill_Reminder} />
          <PlanTab.Screen name="Goal" component={Goal} />

      </PlanTab.Navigator>
  );
};
