import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../context/themes";

export enum ButtonType {
  BASIC = 'Basic',
  LOUD = 'Loud',
  REVERSE = 'Reverse',
}

const buttonTypetoStyle = {
  [ButtonType.BASIC]: {
    backgroundColor: colors.input,
    borderColor: colors.border,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    color: 'white',
  },
  [ButtonType.LOUD]: {},
  [ButtonType.REVERSE]: {
    backgroundColor: colors.input,
    color: 'white',
  },
}

export function Button({onPress, title, type = ButtonType.LOUD, styles = {}}){
  const extraStyle = buttonTypetoStyle[type]

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[stylesBase.button, extraStyle, styles]}>{title}</Text>
    </TouchableOpacity>
  );
}

const stylesBase = StyleSheet.create({
  button: {
    backgroundColor: colors.link,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    borderWidth: 1,
    borderColor: colors.link,
    borderRadius: 4,
    fontSize: 12,
  },
});
