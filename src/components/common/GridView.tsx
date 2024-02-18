import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import SPLASH from '../../assets/splash.png';
import { Card } from "../core/Card";
import { colors } from "../../context/themes";
import { RouteNames } from "../../constants/constants";
import FORWARD_THIN from '../../assets/forward_thin.png'

// const renderFunc = (item) => {
//   return (
//     <>
//       <Image source={SPLASH} width={32} height={32} style={{borderColor: 'red', borderWidthX: 2}}/>
//       <Text style={{flexDirection: 'row', width: 128, padding: 4, color: colors.textLowlight}}>
//         {item.name}
//       </Text>
//     </>
//   )
// } a

// export function GridViewOld(props){
//   const { columnsCount = 3, data, onPress, renderFunc, navigation } = props;

//   const renderItem = ({item}) => {
//     return (
//       <Card styles={{flexDirection: 'row', justifyContent: 'space-between', width: 128, marginRight: 16, marginBottom: 16 ,padding: 0, backgroundColor: colors.input}}>
//         <View style={{flexDirection: 'row', flexShrink: 1, padding: 16, alignItems: 'center'}}>
//           {/* <Image source={SPLASH} style={{borderColor: 'red', borderWidthX: 2, width: 16, height: 16}}/> */}
//           <Text style={{flexDirection: 'row', width: 128, color: colors.textRegular, fontSize: 12}}>
//             {item.name}
//           </Text>
//         </View>
//         {/* <Text onPress={() => onPress(item)} style={{borderLeftColor: colors.border, borderLeftWidth: 1, padding: 4, paddingTop: 16, color: colors.textHighlight, backgroundColor: colors.foreground, borderTopRightRadius: 4, borderBottomRightRadius: 4}}>{">"}</Text> */}
//         <TouchableOpacity
//           onPress={() => onPress(item)}
//           style={{
//             padding: 4,
//             justifyContent: 'space-around',
//             // alignContent: 'center',
//             // alignSelf: 'center',
//             // alignItems: 'center',
//             borderColor: 'green',
//             borderWidthX: 1,
//             borderLeftColor: colors.border,
//             borderLeftWidth: 1,
//             // padding: 4,
//             // paddingTop: 16,
//             backgroundColor: colors.foreground,
//             borderTopRightRadius: 4,
//             borderBottomRightRadius: 4
//           }}
//         >
//           <Image source={FORWARD_THIN} style={{
//             width: 11,
//             height: 10,
//             // alignSelf: 'center',
//             borderColor: 'red',
//             borderWidthX: 1,
//           }}/>
//         </TouchableOpacity>
//       </Card>
//     )
//   }

//   return (
//     <FlatList 
//       numColumns={columnsCount}
//       renderItem={renderItem}
//       data={data}
//       keyExtractor={(item) => item.id}
//     />
//   )
// }

export function GridView(props){
  const { navigation, renderElement, elements } = props;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
      {elements.map((element, idx) => renderElement(element, idx, navigation))}
    </View>
  )
}


