import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../context/themes";
import { Dropdown } from "./Dropdown";
import React from "react";

const DEFAULT_STYLE = {
  top: 32,
  left: 0,
  width: "100%",
}

export function RTextInput({
  value,
  onChangeText,
  placeholder,
  numberOfLines = null,
  label=null,
  selections = [],
  onSelect = (selection) => {},
  freeze = false,
  style={},
  dropdownStyle=DEFAULT_STYLE
}){
  
  // const [hoverItem, setHoverItem] = React.useState(undefined);
  const [showDropdown, setShowDropdown] = React.useState(false)
  //const zIndex = selections ? 100 : 0;

  //console.log({showDropdown, zIndex})

  const filteredSelections = selections.filter(item => item?.name?.startsWith(value))

  return (
    <View style={style}>
      {showDropdown && (
        <Dropdown
          items={freeze ? selections : filteredSelections}
          onSelect={onSelect}
          onHoverOut={() => {
            setShowDropdown(false)
          }}
          //hoverItem={hoverItem}
          //setHoverItem={(item) => {console.log(item); setHoverItem(item)}}
          style={[styles.dropdown, {top: dropdownStyle.top, left: dropdownStyle.left, width: dropdownStyle.width}]}
        />)
      }
      <View style={styles.labeledInput}>
        {label && <Text style={styles.label}>{label}</Text>}
          {freeze ? 
          <Text style={styles.textbox} onPress={() => filteredSelections.length > 0 && setShowDropdown(showDropdown => !showDropdown)}>
            {value}
          </Text> : (
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
          )}
      </View>
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
    alignSelf: 'center',
    fontSize: 10,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    // borderColor: 'red',
    // borderWidth: 1,
    color: colors.textHighlight,
  },
  textbox: {
    color: colors.textRegular,
    fontSize: 12,
    backgroundColor: colors.input,
    padding: 8,
    borderRadius: 4,
    flex: 1,
    minWidth: 64,
  },
  dropdown: {
    position: 'absolute',
  },
});
