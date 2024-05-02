import { FlatList, Touchable } from 'react-native';
import ExpenseListItem from "./Expense_listItem";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Expense_List() {

  return(

    <FlatList
      data={[1,2,3]}
      contentContainerStyle={{gap:8}}
      renderItem={()=> <ExpenseListItem />}
      
    />
  );
}