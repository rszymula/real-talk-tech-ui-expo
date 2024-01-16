import React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { getComments } from '../../../../services/DiscussService';
import { colors } from '../../../../context/themes';
import { Separator } from '../../../../core/Separator';
import { InputBar } from '../../../../core/InputBar';
import { INPUT_PLACEHOLDER } from '../../../../constants';

function Comment({text, username, upvotes, createdTimestamp}) {
  console.log(text)
  return (
    <>
      <View>
        <Text style={[styles.captionText, styles.categoryCaption]}>
          {`${username} | ${createdTimestamp}`}
        </Text>
        {/* <Text>{createdTimestamp}</Text> */}
        <Text style={[styles.bodyText, styles.description]}>{text}</Text>
        {/* <Text>{upvotes}</Text> */}
      </View>
    </>
  )
}

const COMMENT_OFFSET = 10;

function CommentsList({comments}){

  const handleSubmitComment = (input) => {
    console.log("Commented", input)
    // make API call
    // if succcessful call passed in function to store the new state
  }

  return (
    <View>
      <FlatList
        style={{borderLeftWidth: 0.5, borderColor: colors.border, paddingLeft: 24, marginTop: 12}}
        data={comments}
        renderItem={({item}) => {
          console.log("xyz", item)
          return <Comment {...item}/>
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Separator style={styles.separator}/>}
      />
      <View style={styles.inputContainer}>
        <InputBar
          onPress={handleSubmitComment}
          title={"^"}
          placeholder={INPUT_PLACEHOLDER}
        />
      </View>
    </View>
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
      console.log("checkID", {id, page, COMMENT_OFFSET})
      const mockComments = getComments(id, page, COMMENT_OFFSET);
      console.log({id, page, COMMENT_OFFSET}, mockComments)
      setComments([...mockComments]);
    }
  }, [commentsExpanded])
  
  console.log("render", comments, commentsExpanded)

  const commentText = commentCount === 1 ? `${commentCount} Comment` : `${commentCount} Comments`;

  return (
    <View style={styles.container}>
      <Text style={[styles.captionText, styles.categoryCaption]}>{currentCategory}</Text>
      <Text style={[styles.headingText, styles.title]}>{title}</Text>
      <Text style={[styles.bodyText, styles.description]}>{description}</Text>
      <View style={styles.bottom}>
        <View style={styles.actionGroup}>
          <TouchableOpacity onPress={handleCommentsPress}>
            <Text style={[styles.linkText]}>{commentText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCommentsPress}>
            <Text style={[styles.linkText, styles.actionMember]}>^</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.captionText, styles.userCaption]}>{`${username} | ${createdTimestamp}`}</Text>
      </View>
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
    // flexDirection: 'row',
    marginTop: 32,
  },
  captionText: {
    color: colors.textLowlight,
    fontSize: 8,
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
  categoryCaption: {

  },
  userCaption: {

  },
  title: {
    marginTop: 8,
  },
  description: {
    marginTop: 8,
  },
  link: {
    marginTop: 16,
  },
  bottom: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  actionGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  actionMember: {
    marginLeft: 16,
  },
  separator: {
    marginTop: 12,
    marginBottom: 12,
  }
})
