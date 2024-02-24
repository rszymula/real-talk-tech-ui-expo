// import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text, Pressable } from "react-native";
// import { Button, ButtonType } from "./Button";
// import React from "react";
// import { colors } from "../../context/themes";

// export function InputBar({onPress, placeholder, title = null, image = null, imageSize=14,  imageRatio=1, style = {}, numLines = 1}){

//   const [input, setInput] = React.useState('');
//   const [active, setActive] = React.useState(false)

//   const handleSetInput = (newInput) => {
//     setInput(newInput);
//   }

//   const handleOnPress = (inputText) => {
//     onPress(inputText)
//     setInput('');
//   }

//   return (
//     // <View style={[styles.card, style]}>
//       // <TouchableOpacity style={[styles.inputBarContainer, style]} onPress={() => setActive(active => !active)}>
//       <View style={[styles.inputBarContainer, style]}>
//         <TextInput 
//           onChangeText={handleSetInput}
//           value={input}
//           placeholder={placeholder}
//           style={styles.input}
//           multiline={active && numLines > 1}
//           numberOfLines={numLines}
//           // onFocus={() => setActive(active => !active)}
//           // onBlur={() => setActive(active => !active)}
//           onFocus={() => setActive(true)}
//           onBlur={() => setActive(false)}
//         />
//         {/* {(!!title || !!image) && <Button
//           title={title}
//           image={image}
//           imageSize={imageSize}
//           onPress={() => handleOnPress(input)}
//           type={ButtonType.BASIC}
//           textStyle={{color: colors.textHighlight}}
//           styles={{alignSelf: 'center', color: colors.textHighlight, borderWidth: 0, borderRadius: 0, borderTopRightRadius: 4, borderBottomRightRadius: 4}}
//         />} */}
//         {(!!title || !!image) && 
//           <Pressable
//             // title={title}
//             // image={image}
//             // imageSize={imageSize}
//             onPress={() => handleOnPress(input)}
//             // // type={ButtonType.BASIC}
//             // textStyle={{color: colors.textHighlight}}
//             // styles={{alignSelf: 'center', color: colors.textHighlight, borderWidth: 0, borderRadius: 0, borderTopRightRadius: 4, borderBottomRightRadius: 4}}
//             style={[{
//               backgroundColor: colors.foreground,
//               paddingTop: active ? numLines * 8 : 8, // since wanted 'numLines > 1 ? numLines * 8 : 8,' which is same as numLines since when numLines is 1 then its 8
//               paddingBottom: active ? numLines * 8 : 8,
//               paddingLeft: 8,
//               paddingRight: 8,
//               alignSelf: 'center',
//               // borderColor: colors.border,
//               // borderWidth: 1,
//               // borderTopRightRadius: 4,
//               // borderBottomRightRadius: 4,
//             }, styles.verticalSeparator]}
//           >
//             {title && <Text style={{color: colors.textHighlight, fontSize: 12, alignSelf: 'center'}}>{title}</Text>}
//             {image && 
//               <View>
//                 <Image
//                   source={image}
//                   style={{width: imageSize * imageRatio, height: imageSize}}
//                 />
//               </View>
//             }
//           </Pressable>
//         }
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   inputBarContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: colors.background,
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: 4,
//     // borderColor: 'yellow',
//     // borderWidth: 1,
//   },
//   input: {
//     backgroundColor: colors.background,
//     // paddingLeft: 8,
//     // paddingTop: 4,
//     // paddingBottom: 4,
//     // margin: 8,
//     color: colors.textRegular,
//     fontSize: 12,
//     // borderRightWidth: 1,
//     //borderColor: colors.border,
//     // width: "100%",
//     // borderColor: 'red',
//     // borderWidth: 1,
//     // borderRightWidth: 0,
//     // borderTopLeftRadius: 4,
//     // borderBottomLeftRadius: 4,
//     flex: 1,
//     padding: 8,
//     // margin: 2
//   },
//   // card: {
//   //   borderWidth: 1,
//   //   borderColor: colors.border,
//   //   borderRadius: 4,
//   // },
//   verticalSeparator: {
//     borderLeftWidth: 1,
//     borderLeftColor: colors.border,
//   }
// });

import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { Button, ButtonType } from "./Button";
import React from "react";
import { colors } from "../../context/themes";

export function InputBar({onPress, placeholder, title = null, image = null, imageSize=16,  style = {}, numLines = 1}){

  const [input, setInput] = React.useState('');
  const [active, setActive] = React.useState(false)

  const handleSetInput = (newInput) => {
    setInput(newInput);
  }

  const handleOnPress = (inputText) => {
    onPress(inputText)
    setInput('');
  }

  const imageWidthRatio = 1;

  return (
    // <View style={[styles.card, style]}>
      // <TouchableOpacity style={[styles.inputBarContainer, style]} onPress={() => setActive(active => !active)}>
      <View style={[styles.inputBarContainer, style]}>
        <TextInput 
          onChangeText={handleSetInput}
          value={input}
          placeholder={placeholder}
          style={styles.input}
          multiline={active && numLines > 1}
          numberOfLines={numLines}
          // onFocus={() => setActive(active => !active)}
          // onBlur={() => setActive(active => !active)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        />
        {(!!title || !!image) && 
          // <Button
          //   title={title}
          //   image={image}
          //   imageSize={imageSize}
          //   onPress={() => handleOnPress(input)}
          //   type={ButtonType.BASIC}
          //   textStyle={{color: colors.textHighlight}}
          //   styles={{alignSelf: 'center', color: colors.textHighlight, borderWidth: 0, borderRadius: 0, borderTopRightRadius: 4, borderBottomRightRadius: 4}}
          // />
          <TouchableOpacity onPress={onPress}>
            <View style={[styles.typeStyle, styles.buttonExtra]}>
              {image && 
                <View>
                  <Image source={image}  
                    style={{
                      margin: 2,
                      width: imageSize * imageWidthRatio,
                      height: imageSize,
                      // borderColor: 'red',
                      // borderWidth: 1,
                    }} 
                  />
                </View>
              }
              {title && 
                <Text 
                style={
                  [{marginLeft: 2, color: colors.textRegular, fontSize: 12}, styles.textStyle]
                }
                >
                  {title}
                </Text>
              }
            </View>
          </TouchableOpacity>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  typeStyle: {
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: colors.input,
    borderColor: colors.border,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    color: colors.textRegular,
  },
  buttonExtra: {
    alignSelf: 'center',
    color: colors.textHighlight,
    borderWidth: 0,
    borderRadius: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  textStyle: {color: colors.textHighlight},
  inputBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },
  input: {
    // paddingLeft: 8,
    // paddingTop: 4,
    // paddingBottom: 4,
    padding: 8,
    color: colors.textRegular,
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    // width: "100%",
    flex: 1,
    margin: 2
  },
  // card: {
  //   borderWidth: 1,
  //   borderColor: colors.border,
  //   borderRadius: 4,
  // },
});
