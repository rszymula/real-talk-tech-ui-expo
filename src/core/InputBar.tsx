import { View, TextInput, StyleSheet } from "react-native";
import { Button, ButtonType } from "./Button";
import React from "react";
import { colors } from "../context/themes";

export function InputBar({onPress, placeholder, title = null, style = {}, numLines=3}){

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
        {!!title && <Button
          title={title}
          onPress={() => onPress(input)}
          type={ButtonType.BASIC}
          styles={{marginLeft: 8}}
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
    // borderColor:'red',
    // borderWidth: 2,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
  },
  input: {
    color: colors.textRegular,
    fontSize: 12,
    width: "100%",
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },
});
