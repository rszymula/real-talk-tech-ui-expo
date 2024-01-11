import { Text, View, Button, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../context/themes';

export function Card({children, styles = {}}){
  return (
    <View style={[stylesBase.card, styles]}>
      {children}
    </View>
  )
};

const stylesBase = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    margin: 0,
    backgroundColor: colors.foreground,
  },
})
