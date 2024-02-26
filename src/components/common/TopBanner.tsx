import { View, Text } from "react-native";
import { colors } from "../../context/themes";


export function TopBanner(props){
  console.log("ERRW", props.apiCallResult)
  return (
    <View style={{backgroundColor: props.apiCallResult.error ? colors.error : colors.link}}>
      <Text style={{margin: 8, alignSelf: 'center', fontSize: 12, color: colors.background}}>{props.apiCallResult.message}</Text>
    </View>
  )
}
