import { View, TouchableOpacity, Image } from "react-native";
import { colors } from "../../context/themes";
import BACK from '../../assets/back.png';

export function Heading({navigation, children = null}){

  const handleBackPress = () => {
    // navigation.pop(1);
    navigation.pop(1);
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
        <TouchableOpacity onPress={handleBackPress} style={{
          padding: 8,
          borderColor: colors.border,
          borderWidth: 1,
          backgroundColor: colors.input,
          borderRadius: 4,
          alignSelf: 'center'
        }}
        >
          <Image source={BACK} style={{width: 12, height: 12}} />
        </TouchableOpacity>
        {children}
        <View style={{width: 20, height: 20}}></View>
      </View>
  )
};
