import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { DiscussNavBar } from './DiscussNavBar';
import { DiscussContent } from './DiscussContent';
import { CategoryNames } from '../../../constants';

export function DiscussHomeScreen(props){

  const { navigation } = props;

  const [currentCategory, setCurrentCategory] = React.useState(CategoryNames.HOME);

  const handleSetCurrentCategory = (newCategory) => {
    console.log("handle", newCategory)
    setCurrentCategory(newCategory)
  }

  return (
    <View style={styles.container}>
      {/* <Text>WHY</Text> */}
      <DiscussNavBar handleSetCurrentCategory={handleSetCurrentCategory} />
      <DiscussContent currentCategory={currentCategory} navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    borderColor: 'red',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    // margin: 2,
  }
})