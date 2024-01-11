import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../context/themes';

export function Separator(){
  return (
    <View style={styles.default}></View>
  )
}

const styles = StyleSheet.create({
  default: {
    height: 0.5,
    borderTopWidth: 0.5,
    borderColor: colors.border,
    marginTop: 8,
  }
})

