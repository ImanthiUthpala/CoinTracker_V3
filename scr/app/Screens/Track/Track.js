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
import {Category} from './Category';
import {AddCategory} from './AddCategory';
import {UpdateCategory} from './UpdateCategory';
import {AddExpense} from './AddExpense';
import {UpdateExpense} from './UpdateExpense';



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

function CategoryStack(){
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen
        name="CategoryStack"
        component={Category}
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
        name="AddExpense"
        component={AddExpense}
        options={{
          presentation:'modal',
          headerShown:true
          }
        }
        />
       
    </Stack.Navigator>
  );
}

function ExpenseStack(){
  return(
    <Stack.Navigator >
      <Stack.Screen
        name="ExpenseStack"
        component={Expense}
        options={{
          headerShown:false
        }}
        />
      <Stack.Screen
        name="Category"
        component={CategoryStack}
        options={{
          presentation:'modal',
          headerShown:false
          }
        }
        />
         <Stack.Screen
        name="UpdateExpense"
        component={UpdateExpense}
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
      <TrackTab.Screen name="Expense" component={ExpenseStack} />

      

    </TrackTab.Navigator>
    
    </SafeAreaProvider>
       
      
  );
}


