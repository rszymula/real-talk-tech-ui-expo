import { View, TextInput, StyleSheet } from "react-native";
import { Button, ButtonType } from "./Button";
import React from "react";
import { colors } from "../../context/themes";

export function InputBar({onPress, placeholder, title = null, image = null, imageSize=16,  style = {}, numLines=3}){

  const [input, setInput] = React.useState('');

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
          numberOfLines={numLines}
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
    marginLeft: 8,
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
