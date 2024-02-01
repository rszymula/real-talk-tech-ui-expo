import { FlatList, Text, View, Image } from "react-native";
import SPLASH from '../../assets/splash.png';
import { Card } from "../core/Card";
import { colors } from "../context/themes";
import { RouteNames } from "../constants";

export function GridView(props){
  const { columnsCount = 3, data, onPress, navigation } = props;

  const renderItem = ({item}) => {
    return (
      <Card styles={{flexDirection: 'row', justifyContent: 'space-between', width: 128, marginRight: 16, marginBottom: 16 ,padding: 0, backgroundColor: colors.input}}>
        <View style={{flexDirection: 'row', flexShrink: 1, paddingTop: 16, paddingBottom: 16}}>
          <Image source={SPLASH} width={32} height={32} style={{borderColor: 'red', borderWidthX: 2}}/>
          <Text style={{flexDirection: 'row', width: 128, padding: 4, color: colors.textLowlight}}>
            {/* <Image source={SPLASH} width={32} height={32} style={{borderColor: 'red', borderWidthX: 2}}/> */}
            {/* {"sdfsdfkjskfjksljflskjflskfjl"} */}
            {item.name}
          </Text>
        </View>
        <Text onPress={() => onPress(item)} style={{borderLeftColor: colors.border, borderLeftWidth: 1, padding: 4, paddingTop: 16, color: colors.textHighlight, backgroundColor: colors.foreground, borderTopRightRadius: 4, borderBottomRightRadius: 4}}>{">"}</Text>
      </Card>

      // <View style={{width: 128}}>
      //   <Card styles={{flexDirection: 'row', flexShrink: 1}}>
      //     <Text>a</Text>
      //     <Text style={{maxWidth: 64, flexShrink: 1}}>bfksjdhfksjdhfksdjhfksdjfhksjhdfkdsjhfks</Text>
      //     <Text>c</Text>
      //   </Card>
      // </View>
    )
  }

  return (
    <FlatList 
      numColumns={columnsCount}
      renderItem={renderItem}
      data={data}
      keyExtractor={(item) => item.id}
      // ItemSeparatorComponent={() => <View style={{width: 16}}>XXXXX</View>}
    />
  )
}