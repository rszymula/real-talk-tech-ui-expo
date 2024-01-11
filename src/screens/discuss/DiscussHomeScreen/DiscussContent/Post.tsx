import React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { getComments } from '../../../../services/DiscussService';
import { colors } from '../../../../context/themes';

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

  const [newComment, setNewComment] = React.useState('');

  const handleTextChange = () => {
    setNewComment(newComment)
  }
  const handleSubmitComment = () => {
    // make API call
    // if succcessful call passed in function to store the new state
  }

  return (
    <>
      <FlatList
        data={comments}
        renderItem={({item}) => {
          console.log("xyz", item)
          return <Comment {...item}/>
        }}
        keyExtractor={(item) => item.id}
      />
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
    <View style={styles.container}>
      <Text style={styles.captionText}>{currentCategory}</Text>
      <Text style={styles.headingText}>{title}</Text>
      <Text style={styles.bodyText}>{description}</Text>
      <TouchableOpacity onPress={handleCommentsPress}>
        <Text style={styles.linkText}>{commentCount}</Text>
      </TouchableOpacity>
      <Text style={styles.captionText}>{`${username} | ${createdTimestamp}`}</Text>
      {commentsExpanded ? <CommentsList comments={comments} /> : null}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // width: "100%",
    // borderColor: 'red',
    // borderWidth: 2,
    marginTop: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  captionText: {
    color: colors.textLowlight,
    fontSize: 10,
  },
  headingText: {
    color: colors.textHighlight,
    fontSize: 12,
    fontWeight: 'bold',
  },
  bodyText: {
    color: colors.textRegular,
    fontSize: 12,
  },
  linkText: {
    color: colors.link,
    fontSize: 12,
  },
})
