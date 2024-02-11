import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../context/themes";
import { Dropdown } from "./Dropdown";
import React from "react";

export function RTextInput({
  value,
  onChangeText,
  placeholder,
  numberOfLines = null,
  label=null,
  selections = [],
  onSelect = (selection) => {},
  style={}
}){
  
  const [hoverItem, setHoverItem] = React.useState(undefined);
  const [showDropdown, setShowDropdown] = React.useState(false)
  //const zIndex = selections ? 100 : 0;

  //console.log({showDropdown, zIndex})

  const filteredSelections = selections.filter(item => item.name.startsWith(value))

  return (
    <View style={style}>
      {showDropdown && (
        <Dropdown
          items={filteredSelections}
          onSelect={onSelect}
          onHoverOut={() => {
            console.log("HORREEEEZ")
            setShowDropdown(false)
          }}
          //hoverItem={hoverItem}
          //setHoverItem={(item) => {console.log(item); setHoverItem(item)}}
          style={styles.dropdown}
        />)
      }
      <View style={styles.labeledInput}>
        {label && <Text style={styles.label}>{label}</Text>}
        {/* <TouchableOpacity onPress={() => {
          // console.log("QWER", selections, showDropdown)
          selections.length > 0 && setShowDropdown(true)}
        }> */}
          <TextInput
            multiline={numberOfLines && numberOfLines > 1}
            numberOfLines={numberOfLines} 
            onChangeText={onChangeText}
            value={value}
            style={styles.textbox}
            placeholder={placeholder}
            //blurOnSubmit
            onFocus={() => filteredSelections.length > 0 && setShowDropdown(true)}
            // onBlur={(e) => {
            //     e.preventDefault()
            //     selections.length > 0 && setTimeout(() => setShowDropdown(false), 10000)
            //   }
            // }
          />
        {/* </TouchableOpacity> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textbox: {
    color: colors.textLowlight,
    backgroundColor: colors.input,
    padding: 8,
    width: "100%",
  },
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
  dropdown: {
    position: 'absolute',
    // zIndex: 100,
    top: 48,
    left: 96,
  },
});
