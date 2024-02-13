// import { Text, View, Button, StyleSheet, Pressable, TextInput, TouchableOpacity, FlatList } from 'react-native';
// import { colors } from '../../context/themes';
// import React from 'react';

// const EMPTY = undefined

// export function Dropdown({
//   items,
//   onSelect,
//   onHoverOut,
//   hoverItem,
//   setHoverItem,
//   style = {}
// }){

//   const renderItem = ({item}) => (
//     <Pressable
//       onPress={() => onSelect(item)}
//       onHoverIn={() => setHoverItem(item.name)}
//       onHoverOut={() => setHoverItem(EMPTY)}
//     >
//       <Text style={hoverItem === item.name ? stylesBase.itemHover : stylesBase.item}>
//         {item.name}
//       </Text>
//     </Pressable>
//   )

//   return (
//     <View style={[stylesBase.container, style]}>
//       <FlatList 
//         data={items}
//         renderItem={renderItem}
//         ItemSeparatorComponent={(item) => (<></>)}
//         keyExtractor={item => item.name}
//       />
//     </View>
//   )
// };

// const stylesBase = StyleSheet.create({
//   container: {
//     borderWidth: 1,
//     borderColor: colors.border,
//     backgroundColor: colors.foreground,
//     position: 'absolute',
//     zIndex: 10,
//     padding: 4,
//   },
//   item: {
//     color: colors.textRegular
//   },
//   itemHover: {
//     backgroundColor: colors.link,
//     color: colors.textHighlight,
//   }
// })





import { Text, View, Button, StyleSheet, Pressable, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../../context/themes';
import React from 'react';

const EMPTY = undefined

let timeoutId = EMPTY;

export function Dropdown({
  items,
  onSelect,
  onHoverOut,
  // hoverItem,
  // setHoverItem,
  style = {}
}){

  const [hoverLast, setHoverLast] = React.useState(EMPTY)
  const [hoverCurr, setHoverCurr] = React.useState(EMPTY)
  //const [timeoutId, setTimeoutId] = React.useState(EMPTY);

  // let timeoutId = EMPTY;

  const handleHoverIn = (name) => {
    console.log("A", {timeoutId})
    if(timeoutId){
      clearTimeout(timeoutId)
      //setTimeoutId(EMPTY)
      timeoutId = EMPTY
      console.log("B", {timeoutId})
    }
    console.log("IN", {name})
    setHoverCurr(name)
    
  }

  const handleHoverOut = (name) => {
    console.log("OUT", {name})
    setHoverLast(name)
    // // setHoverLast(hoverCurr)
    // // if(hoverCurr === hoverLast){
    // //   onHoverOut()
    // // }
    // // setHoverCurr(hoverCurr => EMPTY)
    // setHoverCurr(EMPTY)
    // //console.log({hoverCurr})
    // setTimeout(() => {
    //   if(hoverCurr === EMPTY){
    //     console.log("DID IT")
    //     onHoverOut()
    //   }else{
    //     console.log("NOTsdfs")
    //   }
    // }, 1)
    const id = setTimeout(() => {
      onHoverOut()
    }, 10)
    timeoutId = id
    console.log("C", {timeoutId})
    //setTimeoutId(id)

  }

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => onSelect(item)}
      onHoverIn={() => handleHoverIn(item.name)}
      onHoverOut={() => handleHoverOut(item.name)}
    >
      <Text style={hoverCurr === item.name ? stylesBase.itemHover : stylesBase.item}>
        {item.name}
      </Text>
    </Pressable>
  )

  // if(hoverLast === hoverCurr){
  //   return null;
  // }

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
