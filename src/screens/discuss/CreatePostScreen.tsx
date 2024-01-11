import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export function CreatePostScreen(props){

  const { navigation } = props;

  const handleOnPress = () => {
    //navigation.navigate(RouteNames.DISCUSS)
  }

  return (
    <>
      <Text>CreatePostScreen</Text>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: 'red',
    borderWidth: 2,
    padding: 16,
  }
})
