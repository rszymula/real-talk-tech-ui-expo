import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import SPLASH from '../../assets/splash.png';
import { Card } from "../core/Card";
import { colors } from "../../context/themes";
import { RouteNames } from "../../constants/constants";
import FORWARD_THIN from '../../assets/forward_thin.png'

export function GridView(props){
  const { navigation, renderElement, elements } = props;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
      {elements.map((element, idx) => renderElement(element, idx, navigation))}
    </View>
  )
}


