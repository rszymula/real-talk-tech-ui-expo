import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../../context/themes";
import X from '../../assets/x.png';
import THUMBSUP from '../../assets/thumbsup.png';
import { Button, ButtonType } from "../core/Button";


export function SelectedItems(props){
  const {items, onDelete, style, itemStyle = {}} = props
  return (
    <View style={[{flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}, style]}>
      {items.map(item => {
        return (
          <View style={[styles.item, itemStyle]}>
            <Text style={{color: colors.textRegular, fontSize: 11}}>{item}</Text>
            {!!onDelete && (<TouchableOpacity onPress={() => onDelete(item)}>
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

export function SelectedItemsClickable(props){
  const {items, onDelete, style, onPress, itemStyle = {}} = props
  return (
    <View style={[{flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}, style]}>
      {items.map(item => {
        return (
          <TouchableOpacity onPress={() => onPress(item)} style={[item.endorsedByRequester ? styles.itemClickableInactive : styles.itemClickableActive, itemStyle]}>
            <Text style={item.endorsedByRequester ? styles.textClickableInactive : styles.textClickableActive}>{item.name}</Text>
            {!item.endorsedByRequester && (<View style={{marginLeft: 4, marginTop: 2}}>
              <Image source={THUMBSUP} style={{width: 11, height: 11}}/>
            </View>)}
            {/* {!!onDelete && (<TouchableOpacity onPress={() => onDelete(item)}>
              <View style={{marginLeft: 4, marginTop: 2}}>
                <Image source={X} style={{width: 8, height: 8}}/>
              </View>
            </TouchableOpacity>)} */}
          </TouchableOpacity>
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
    // color: colors.textRegular,
    marginTop: 8,
    marginLeft: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemClickableInactive: {
    // borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.link,
    backgroundColor: colors.foreground,
    // color: colors.textRegular,
    marginTop: 8,
    marginLeft: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemClickableActive: {
    // borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.link,
    // color: colors.textRegular,
    marginTop: 8,
    marginLeft: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textClickableInactive: {
    fontSize: 11,
    color: colors.textRegular
  },
  textClickableActive: {
    fontSize: 11,
    color: colors.background,
  },
});
