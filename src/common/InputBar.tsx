import { View, TextInput, StyleSheet } from "react-native";
import { DiscussRouteNames } from "../screens/discuss";
import { Button, ButtonType } from "./Button";
import { Card } from "./Card";
import React from "react";
import { colors } from "../context/themes";

export function InputBar({onPress, placeholder, title}){

  const [input, setInput] = React.useState('');

  const handleSetInput = (newInput) => {
    setInput(newInput);
  }

  return (
    <Card styles={styles.card}>
      <View style={styles.inputBarContainer}>
        <TextInput 
          onChangeText={handleSetInput}
          value={input}
          placeholder={placeholder}
          style={styles.input}
        />
        <Button
          title={title}
          onPress={() => onPress(input)}
          styles={styles.button}
          type={ButtonType.BASIC}
        />
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  button: {
    // width: 256,
    marginLeft: 16,
  },
  inputBarContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  },
  card: {
    marginBottom: 16,
  },
});
