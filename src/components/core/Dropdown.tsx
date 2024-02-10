import { Text, View, Button, StyleSheet, Pressable, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../../context/themes';
import React from 'react';

const EMPTY = undefined

export function Dropdown({items, onSelect, style = {}}){

  const [hoverItem, setHoverItem] = React.useState(EMPTY)

  // const handleOnSelect = (item) => {
  //   console.log("SEL2", item)
  // }

  const renderItem = ({item}) => (
    <Pressable onPress={() => onSelect(item)} onHoverIn={() => setHoverItem(item.name)} onHoverOut={() => setHoverItem(EMPTY)}>
      <Text style={hoverItem === item.name ? stylesBase.itemHover : stylesBase.item}>
        {item.name}
      </Text>
    </Pressable>
  )

  return (
    <View style={[stylesBase.container, style]}>
      <FlatList 
        data={items}
        renderItem={renderItem}
        ItemSeparatorComponent={(item) => (<></>)}
        keyExtractor={item => item.name}
      />
    </View>
  )
};

const stylesBase = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.foreground,
    position: 'absolute',
    zIndex: 10,
    padding: 4,
  },
  item: {
    color: colors.textRegular
  },
  itemHover: {
    backgroundColor: colors.link,
    color: colors.textHighlight,
  }
})
