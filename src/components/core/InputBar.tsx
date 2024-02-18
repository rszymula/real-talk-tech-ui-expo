import { View, TextInput, StyleSheet } from "react-native";
import { Button, ButtonType } from "./Button";
import React from "react";
import { colors } from "../../context/themes";

export function InputBar({onPress, placeholder, title = null, image = null, imageSize=16,  style = {}, numLines = 1}){

  const [input, setInput] = React.useState('');
  const [active, setActive] = React.useState(false)

  const handleSetInput = (newInput) => {
    setInput(newInput);
  }

  return (
    <View style={[styles.card, style]}>
      <View style={styles.inputBarContainer}>
        <TextInput 
          onChangeText={handleSetInput}
          value={input}
          placeholder={placeholder}
          style={styles.input}
          multiline={active && numLines > 1}
          numberOfLines={numLines}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        />
        {(!!title || !!image) && <Button
          title={title}
          image={image}
          imageSize={imageSize}
          onPress={() => onPress(input)}
          type={ButtonType.BASIC}
          styles={{color: colors.textHighlight, borderWidth: 0, borderRadius: 0, borderTopRightRadius: 4, borderBottomRightRadius: 4}}
        />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: 4,
  },
  input: {
    paddingLeft: 8,
    color: colors.textRegular,
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    width: "100%",
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },
});
