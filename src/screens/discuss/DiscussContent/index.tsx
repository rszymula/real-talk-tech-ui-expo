import React from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { CategoryNames } from '../../../constants';
import { Post } from './Post';
import { getPostsWithComments } from '../../../services/DiscussService';

// const mockPosts = [
//   {
//     id: 1,
//     //category: CategoryNames.AAA,
//     category: "Aaa",
//     title: 'horses',
//     description: 'are cool',
//     upVotes: 5,
//     created: '2023-01-02',
//     updated: '2023-01-03',
//   },
//   {
//     id: 2,
//     //category: CategoryNames.HOME,
//     category: "Home",
//     title: 'traveling is fun',
//     description: 'I like to travel',
//     upVotes: 5,
//     created: '2023-01-02',
//     updated: '2023-01-03',
//   }
// ]

// const mockComments = [
//   {
//     id: 1,
//     postId: 1,
//     text: 'wow you are right',
//     upVotes: 2,
//     created: '2023-01-02',
//     updated: '2023-01-02',
//   },
//   {
//     id: 2,
//     postId: 1,
//     text: 'they really are',
//     upVotes: 2,
//     created: '2023-05-02',
//     updated: '2023-07-09',
//   },
//   {
//     id: 3,
//     postId: 2,
//     text: 'I went to Europe last summer man',
//     upVotes: 2,
//     created: '2023-02-23',
//     updated: '2023-02-23',
//   },
// ]

const POST_PAGE_OFFSET = 10;

export function DiscussContent(props){

  const [currentPage, setCurrentPage] = React.useState(0);

  const { currentCategory } = props;


  // const DATA = [
  //   {
  //     title: 'Main dishes',
  //     data: ['Pizza', 'Burger', 'Risotto'],
  //   },
  //   {
  //     title: 'Sides',
  //     data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  //   },
  //   {
  //     title: 'Drinks',
  //     data: ['Water', 'Coke', 'Beer'],
  //   },
  //   {
  //     title: 'Desserts',
  //     data: ['Cheese Cake', 'Ice Cream'],
  //   },
  // ];

  const posts = getPostsWithComments(0, POST_PAGE_OFFSET);

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
