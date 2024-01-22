import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Card } from '../core/Card';
import { InputBar } from '../core/InputBar';
import { Separator } from '../core/Separator';
import { RouteNames, INPUT_PLACEHOLDER } from '../constants';
import { colors } from '../context/themes';
import { getComments, getPostsWithCommentIdsAndUpvotes } from '../services/DiscussService';

const POST_PAGE_OFFSET = 10;
const COMMENT_OFFSET = 10;

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

function Post({ id, title, description, username, commentIds, createdTimestamp, currentCategory, navigation }){

  const commentCount = commentIds?.length || 0;

  const [commentsExpanded, setCommentsExpanded] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [comments, setComments] = React.useState([]);

  const handleCommentsPress = () => {
    setCommentsExpanded(!commentsExpanded)
    // navigation.navigate()
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

export function DiscussHome(props){

  const [currentPage, setCurrentPage] = React.useState(0);

  const { currentCategory, navigation } = props;
  const posts = getPostsWithCommentIdsAndUpvotes(currentCategory, 0, POST_PAGE_OFFSET);

  return (
      <Card styles={{width: 512}}>
        <InputBar 
          onPress={(input) => {
            navigation.navigate(RouteNames.DISCUSS_CREATE_POST, { input })
          }}
          title={"Create Post"}
          placeholder={INPUT_PLACEHOLDER}
        />
        <Separator style={{marginTop: 16}} />
        <View>
          <FlatList 
            data={posts}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => <Post {...item} currentCategory={currentCategory} navigation={navigation} />}
            ItemSeparatorComponent={() => <Separator />}
          />
        </View>
      </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 2,
    marginTop: 16,
    marginBottom: 8,
  },
  inputContainer: {
    marginTop: 32,
  },
  captionText: {
    color: colors.textLowlight,
    fontSize: 12,
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
