import React from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { CategoryNames } from '../../../constants';
import { Post } from './Post';
import { getPostsWithCommentIdsAndUpvotes } from '../../../services/DiscussService';

const POST_PAGE_OFFSET = 10;

export function DiscussContent(props){

  const [currentPage, setCurrentPage] = React.useState(0);

  const { currentCategory } = props;

  const posts = getPostsWithCommentIdsAndUpvotes(currentCategory, 0, POST_PAGE_OFFSET);

  return (
    <View style={styles.container}>
      <Text>DiscussContent2</Text>
      <Text>{currentCategory}</Text>
      <FlatList 
        data={posts}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({item}) => <Post {...item} />}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: "70%",
    borderColor: 'green',
    borderWidth: 2,
    padding: 16,
  }
})
