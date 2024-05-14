import { FlatList, Touchable } from 'react-native';
import IncomeListItem from "./Income_listItem";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Income_List() {

  return(

    <FlatList
      data={[1,2,3]}
      contentContainerStyle={{gap:8}}
      renderItem={()=> <IncomeListItem />}
      
    />
  );
}