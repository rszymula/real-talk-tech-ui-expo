import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "../../context/themes";
import { RTextInput } from "./RTextInput";

export function RLabeledTextInput({label, value, onChangeText, placeholder, lines = null}){

  return (
    <View style={styles.labeledInput}>
      <Text style={styles.label}>{label}</Text>
      <RTextInput 
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  labeledInput: {
    flexDirection: 'row',
    backgroundColor: colors.input,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    color: colors.textHighlight,
  },
});
