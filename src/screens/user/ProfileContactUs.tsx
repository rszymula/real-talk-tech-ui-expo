import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { RouteNames, tabs } from '../../constants/constants';
import { Link } from '../core/Link';

export function ProfileContactUs(props){

  const {navigation, Component} = props;

  return (
    <View style={{flexDirection: 'column'}}>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //width: 512,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: 'red',
    borderWidth: 1,
    marginTop: 16,
    marginLeft: 64,
    marginRight: 64,
  },
});
