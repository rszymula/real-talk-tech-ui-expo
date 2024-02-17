import { View, TouchableOpacity, Image } from "react-native";
import { colors } from "../../context/themes";
import REALTALKTECH_WHITE from '../../assets/titleWhite.png'
import BACK from '../../assets/back.png';

export function AlternateNavBar({navigation}){

  const handleBackPress = () => {
    navigation.goBack();
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <TouchableOpacity onPress={handleBackPress} style={{margin: 8, padding: 8, borderColor: colors.border, borderWidth: 1, backgroundColor: colors.input, borderRadius: 4}}>
        <Image source={BACK} style={{width: 12, height: 12}} />
      </TouchableOpacity>
      {/* <Image source={REALTALKTECH_WHITE} style={{width: 256, height: 32}}/> */}
      <Image source={REALTALKTECH_WHITE} style={{width: 128, height: 16, borderColor: 'red', borderWidthX: 1}}/>
      <View style={{margin: 8, padding: 8, width: 12, height: 12, borderColor: 'red', borderWidthX: 1}}>
      </View>
    </View>
  )
};
