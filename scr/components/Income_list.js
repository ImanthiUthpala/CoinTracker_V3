import { FlatList } from 'react-native';
import IncomeListItem from "./Income_listItem";

export default function Income_list(){
  return(
    <FlatList
      data={[1,2,3]}
      contentContainerStyle={{gap:5}}
      renderItem={()=> <IncomeListItem />}
       
    />
  );
}