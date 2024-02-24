import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Button, ButtonType } from "./Button";
import React from "react";
import { colors } from "../../context/themes";

export function InputBar({onPress, placeholder, title = null, image = null, imageSize=16,  style = {}, numLines = 1}){

  const [input, setInput] = React.useState('');
  const [active, setActive] = React.useState(false)

  const handleSetInput = (newInput) => {
    setInput(newInput);
  }

  const handleOnPress = (inputText) => {
    onPress(inputText)
    setInput('');
  }

  return (
    // <View style={[styles.card, style]}>
      // <TouchableOpacity style={[styles.inputBarContainer, style]} onPress={() => setActive(active => !active)}>
      <View style={[styles.inputBarContainer, style]}>
        <TextInput 
          onChangeText={handleSetInput}
          value={input}
          placeholder={placeholder}
          style={styles.input}
          multiline={active && numLines > 1}
          numberOfLines={numLines}
          // onFocus={() => setActive(active => !active)}
          // onBlur={() => setActive(active => !active)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        />
        {(!!title || !!image) && <Button
          title={title}
          image={image}
          imageSize={imageSize}
          onPress={() => handleOnPress(input)}
          type={ButtonType.BASIC}
          textStyle={{color: colors.textHighlight}}
          styles={{alignSelf: 'center', color: colors.textHighlight, borderWidth: 0, borderRadius: 0, borderTopRightRadius: 4, borderBottomRightRadius: 4}}
        />}
    </View>
  )
}

const styles = StyleSheet.create({
  inputBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },
  input: {
    // paddingLeft: 8,
    // paddingTop: 4,
    // paddingBottom: 4,
    padding: 8,
    color: colors.textRegular,
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    // width: "100%",
    flex: 1,
    margin: 2
  },
  // card: {
  //   borderWidth: 1,
  //   borderColor: colors.border,
  //   borderRadius: 4,
  // },
});
