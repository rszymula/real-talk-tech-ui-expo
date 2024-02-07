import { View, Text } from "react-native";
import { colors } from "../context/themes";

export function Link({textLink, onPress, textLeft = '', textRight = '', style={}}){
  return (
    <View style={{...style, flexDirection: 'row'}}>
      <Text style={{color: colors.textLowlight}}>
        {/* Don't see your service? */}
        {textLeft}
      </Text>
      <Text style={{color: colors.link, marginLeft: 4}} onPress={onPress}>
        {/* Create a service profile */}
        {textLink}
      </Text>
      <Text style={{color: colors.textLowlight}}>
        {/* Don't see your service? */}
        {textRight}
      </Text>
    </View>
  )

}