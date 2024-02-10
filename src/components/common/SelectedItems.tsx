import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../context/themes";
import { Button, ButtonType } from "../core/Button";


export function SelectedItems(props){
  const {items, onDelete, style} = props
  return (
    <View style={[{flexDirection: 'row', justifyContent: 'flex-start'}, style]}>
      {items.map(item => {
        return (
          <View style={styles.item}>
            <Text style={{color: colors.textLowlight}}>{item}</Text>
            {!!onDelete && (<TouchableOpacity onPress={() => onDelete(item)}>
              <Text style={{color: colors.textHighlight, marginLeft: 4}}>{"X"}</Text>
            </TouchableOpacity>)}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    // borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.foreground,
    // color: colors.textLowlight,
    margin: 4,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
