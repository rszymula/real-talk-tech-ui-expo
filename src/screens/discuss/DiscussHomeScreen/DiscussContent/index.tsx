import React from 'react';
import { Text, View, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import { CategoryNames } from '../../../../constants';
import { Post } from './Post';
import { getPostsWithCommentIdsAndUpvotes } from '../../../../services/DiscussService';
import { DiscussRouteNames } from '../..';

const POST_PAGE_OFFSET = 10;

const INPUT_PLACEHOLDER = 'Share your SaaS experiences with the community';

function InputBar({navigation}){

  const [input, setInput] = React.useState('');

  const handleSetInput = (newInput) => {
    setInput(newInput);
  }

  const handleCreatePost = () => {
    navigation.navigate(DiscussRouteNames.CREATE_POST);
  } 

  return (
    <View style={styles.inputBarContainer}>
      <TextInput 
        onChangeText={handleSetInput}
        value={input}
        placeholder={INPUT_PLACEHOLDER}
      />
      {/* <View style={styles.button}>
        <Button title='' onPress={handleCreatePost} />
      </View> */}
      <Button title='' onPress={handleCreatePost} />
    </View>
  )
}

export function DiscussContent(props){

  const [currentPage, setCurrentPage] = React.useState(0);
  // const [input, setInput] = React.useState('');

  // const handleSetInput = (newInput) => {
  //   setInput(newInput);
  // }

  const { currentCategory, navigation } = props;
  const posts = getPostsWithCommentIdsAndUpvotes(currentCategory, 0, POST_PAGE_OFFSET);

  console.log("Rendering Discuss")

  return (
    <View style={styles.container}>
      <InputBar {...props} />
      <View style={styles.card}>
        <FlatList 
          data={posts}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item}) => <Post {...item} currentCategory={currentCategory} navigation={navigation} />}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // width: "70%",
    borderColor: 'lightgrey',
    borderWidth: 1,
    margin: 16,
    padding: 8,
  },
  button: {
    width: 256,
  },
  inputBarContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    margin: 0,
  },
})
