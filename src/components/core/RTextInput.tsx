import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../context/themes";
import { Dropdown } from "./Dropdown";
import React from "react";

const DEFAULT_STYLE = {
  top: 32,
  // right: 64,
  width: 256,
  // right: 0,
  // alignSelf: 'flex-end',
  // width: "100%",
}

export function RTextInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  numberOfLines = null,
  label=null,
  selections = [],
  onSelect = (selection) => {},
  onSubmit = (submit) => {},
  freeze = false,
  style={},
  dropdownStyle=DEFAULT_STYLE,
  dropUp = false,
}){
  
  // const [hoverItem, setHoverItem] = React.useState(undefined);
  const [showDropdown, setShowDropdown] = React.useState(false)
  //const zIndex = selections ? 100 : 0;

  //console.log({showDropdown, zIndex})
  const filteredSelections = onChangeText === null ? selections : selections.filter(item => item?.name?.toLowerCase()?.startsWith(value?.toLowerCase()))

  const len = filteredSelections.length > 10 ? 10 : filteredSelections.length
  const top = dropUp ? -(len * 22) : dropdownStyle.top;
  // const top = -22

  console.log("NUMMW", top)

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
          style={[styles.dropdown, {top, left: dropdownStyle.left, width: dropdownStyle.width}]}
        />)
      }
      <View style={styles.labeledInput}>
        {label && 
          <View style={[{alignSelf: 'center', borderColorX: 'red', borderWidthX: 1}, styles.verticalSeparator]}>
            <Text style={styles.label}>{label}</Text>
          </View>
          // <Text style={[styles.label, styles.verticalSeparator, {alignSelf: 'center'}]}>{label}</Text>
        }
        {freeze ? 
        <Text 
          style={[styles.textbox, label ? styles.verticalSeparatorX : {}]}
          onPress={() => filteredSelections.length > 0 && setShowDropdown(showDropdown => !showDropdown)}
        >
          {value}
        </Text> : (
        <TextInput
          // onSubmitEditing={() => console.log("SUBMITW")}
          onSubmitEditing={() => onSubmit(value)}
          multiline={numberOfLines && numberOfLines > 1}
          numberOfLines={numberOfLines} 
          onChangeText={onChangeText}
          value={value}
          style={[styles.textbox, label ? styles.verticalSeparatorX : {}]}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
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
    // padding: 1,
    flexDirection: 'row',
    backgroundColor: colors.input,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    minWidth: 96,
    // alignSelf: 'flex-end',
    // alignItems: 'center',
    // justifyContent: 'space-around',
    fontSize: 10,
    padding: 10,
    // borderRightWidth: 1,
    // borderRightColor: colors.border,
    borderColor: 'red',
    borderWidthX: 1,
    color: colors.textHighlight,
  },
  verticalSeparator: {
    // borderLeftWidth: 1,
    // borderLeftColor: colors.border,
    borderRightWidth: 1,
    borderRightColor: colors.border,
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
    // alignSelf: 'flex-end',
  },
});
