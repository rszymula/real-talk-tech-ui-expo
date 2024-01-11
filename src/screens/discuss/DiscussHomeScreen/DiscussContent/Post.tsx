import React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { getComments } from '../../../../services/DiscussService';

function Comment({text, username, upvotes, createdTimestamp}) {
  console.log(text)
  return (
    <>
      {/* <Text>{username}</Text>
      <Text>{createdTimestamp}</Text> */}
      <Text>{text}</Text>
      {/* <Text>{upvotes}</Text> */}
    </>
  )
}

const COMMENT_OFFSET = 10;

function CommentsList({comments}){

  console.log("In list", comments)

  // const [page, setPage] = React.useState(0);
  // const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState('');

  console.log("In list2", comments)

  const handleTextChange = () => {
    setNewComment(newComment)
  }
  const handleSubmitComment = () => {
    // make API call
    // if succcessful call passed in function to store the new state
  }

  console.log("In list3", comments)

  const comments2 = undefined; //[{text: 'sdfsd'}, {text: 'owieuroikj'}]



  return (
    <>
      {/* <Text>{comments[0]?.text || 'nope'}</Text> */}
      {/* <FlatList 
          data={posts}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item}) => <Post {...item} currentCategory={currentCategory} navigation={navigation} />}
        /> */}
        {!!comments ? comments.map(comment => <Text>{comment.text}</Text>) : null}
      {/* <FlatList
        data={comments}
        renderItem={({item}) => {
          console.log("xyz", item)
          return <Comment {...item}/>
        }}
        keyExtractor={(item) => item.id}
      /> */}
      <View style={styles.inputContainer}>
        <TextInput onChangeText={handleTextChange}/>
        <TouchableOpacity onPress={handleSubmitComment}>
          <Text>^</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}


export function Post({ id, title, description, username, commentIds, createdTimestamp, currentCategory, navigation }){

  const commentCount = commentIds?.length || 0;

  const [commentsExpanded, setCommentsExpanded] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [comments, setComments] = React.useState([]);

  const handleCommentsPress = () => {
    setCommentsExpanded(!commentsExpanded)
    //navigation.navigate()
  }

  React.useEffect(() => {
    if(commentsExpanded && comments.length === 0){
      const mockComments = getComments(id, page, COMMENT_OFFSET);
      console.log({id, page, COMMENT_OFFSET}, mockComments)
      setComments([...mockComments]);
    }
  }, [commentsExpanded])
  
  console.log("render", comments, commentsExpanded)

  return (
    <>
      <Text>{currentCategory}</Text>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <TouchableOpacity onPress={handleCommentsPress}>
        <Text>{commentCount}</Text>
      </TouchableOpacity>
      <Text>{username}</Text>
      <Text>{createdTimestamp}</Text>
      {/* {commentsExpanded ? <CommentsList commentIds={commentIds} /> : null} */}
      {commentsExpanded ? <CommentsList comments={comments} /> : null}
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: 'red',
    borderWidth: 2,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',

  }
})
