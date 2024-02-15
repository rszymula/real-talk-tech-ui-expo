import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../../context/themes";
import X from '../../assets/x.png';
import { Button, ButtonType } from "../core/Button";


export function SelectedItems(props){
  const {items, onDelete, style, itemStyle = {}} = props
  return (
    <View style={[{flexDirection: 'row', justifyContent: 'flex-start'}, style]}>
      {items.map(item => {
        return (
          <View style={[styles.item, itemStyle]}>
            <Text style={{color: colors.textRegular, fontSize: 10}}>{item}</Text>
            {!!onDelete && (<TouchableOpacity onPress={() => onDelete(item)}>
              {/* <Text style={{color: colors.textHighlight, marginLeft: 4}}>{"X"}</Text> */}
              <View style={{marginLeft: 4, marginTop: 2}}>
                <Image source={X} style={{width: 8, height: 8}}/>
              </View>
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
    marginTop: 8,
    marginLeft: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
