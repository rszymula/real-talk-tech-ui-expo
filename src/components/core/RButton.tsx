import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { colors } from "../../context/themes";

export function RButton({onPress, active = false, style = {}, children = null}){
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.base,
        active ? styles.active : styles.inactive,
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
}

export function RButtonText({text, active = false, style = {}}){
  return (
    <Text
      style={[
        styles.textBase,
        active ? styles.textActive : styles.textInactive,
        style,
      ]}
    >
      {text}
    </Text>
  )
}

export function RButtonImage({inactiveImage, activeImage = null, active = false, style = {}}){
  return (
    <View>
      <Image
        source={active ? activeImage : inactiveImage}
        style={[styles.imageBase, style]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,

    borderWidth: 1,
    borderRadius: 4,
    fontSize: 12,
  },
  active: {
    backgroundColor: colors.link,
    // color: colors.background,
    borderColor: colors.link,
  },
  inactive: {
    backgroundColor: colors.foreground,
    // color: colors.background,
    borderColor: colors.border,
  },
  textBase: {
    fontSize: 12,
    alignSelf: 'center',
  },
  textActive: {
    color: colors.background,
  },
  textInactive: {
    color: colors.textRegular,
  },
  imageBase: {
    width: 12,
    height: 12,
  },
});



// export function RButtonText({text, onPress, active = false, textStyle = {}, style = {}}){
//   return (
//     <RButton onPress={onPress} active={active} style={style}>
//       <Text
//         style={[
//           styles.textBase,
//           active ? styles.textActive : styles.textInactive,
//           textStyle,
//         ]}
//       >
//         {text}
//       </Text>
//     </RButton>
//   )
// }