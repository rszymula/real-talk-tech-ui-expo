import { View, Text } from "react-native";
import { colors } from "../../context/themes";

export function Link({textLink, onPress, onLongPress = null, textLeft = '', textRight = '', style={}}){
  return (
    <View style={{...style, flexDirection: 'row'}}>
      <Text style={{color: colors.textLowlight, fontSize: 12}}>
        {/* Don't see your service? */}
        {textLeft}
      </Text>
      <Text style={{color: colors.link, fontSize: 12, marginLeft: 4}} onPress={onPress} onLongPress={onLongPress}>
        {/* Create a service profile */}
        {textLink}
      </Text>
      <Text style={{color: colors.textLowlight, fontSize: 12}}>
        {/* Don't see your service? */}
        {textRight}
      </Text>
    </View>
  )

}