import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Card } from '../../components/core/Card';
import { InputBar } from '../../components/core/InputBar';
import { Separator } from '../../components/core/Separator';
import { RouteNames, INPUT_PLACEHOLDER, CategoryNames, categories } from '../../constants/constants';
import { colors } from '../../context/themes';
// import { getComments, getPostsWithCommentIdsAndUpvotes } from '../services/DiscussService';
import { store } from '../../state/basicStore';
import { connect } from '../../state/reduxStore';
import { mockFeedResponse } from '../../data/discussMocks';
import { Link } from '../../components/core/Link';
import { fetchComments, fetchPosts, makeComment, upvote } from '../../services/DiscussService';
import { createUser } from '../../services/UserServices';
import { Button } from '../../components/core/Button';
import UP from '../../assets/up.png';
import SETTINGS from '../../assets/settings.png';

const POST_PAGE_OFFSET = 10;
const COMMENT_OFFSET = 10;

function Comment({commentText, username, upvotes, creationTime}) {
  console.log("oiuoiu", commentText)
  return (
    <>
      <View>
        <Text style={[styles.captionText, styles.categoryCaption]}>
          {`${username} | ${creationTime}`}
        </Text>
        <Text style={[styles.bodyText, styles.description]}>{commentText}</Text>
      </View>
    </>
  )
}

function checkHasAll(list, obj){
  const keys = Object.keys(obj);
  const hasAll = list.every(id => keys.includes(`${id}`))
  return hasAll
}

function CommentsList({commentIds, comments, postId, makeComment, fetchComments, auth}){

  const handleSubmitComment = (input) => {
    console.log("Commented", input)
    // make API call
    // if succcessful call passed in function to store the new state
    makeComment(postId, "comment text here")
  }

  React.useEffect(() => {
    const hasAll = checkHasAll(commentIds, comments)
    if(!hasAll) {
      fetchComments(postId, auth)
    }
  }, [])

  const hasAll = checkHasAll(commentIds, comments)
  const commentList = hasAll ? commentIds.map(commentId => comments[commentId]) : [];
  console.log({commentIds, comments, commentList})

  return (
    <View>
      <FlatList
        style={{borderLeftWidth: 0.5, borderColor: colors.border, paddingLeft: 24, marginTop: 12}}
        data={commentList}
        renderItem={({item}) => {
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



function RawPost({ id, title, body, user, commentIds, createdTimestamp, currentCategory, navigation, fetchComments, makeComment, comments, commentsLoading, commentsError, upvote, auth}){

  const {id: userId, username} = user;

  const [commentsExpanded, setCommentsExpanded] = React.useState(false);

  const handleCommentsPress = () => {
    setCommentsExpanded(!commentsExpanded)
  }

  const handleUsernamePress = () => {
    navigation.navigate(RouteNames.PROFILE_USER_OTHER, {id: userId, username})
  }

  const handleUpvotePress = () => {

  }

  const handleDownvotePress = () => {
    
  }

  // React.useEffect(() => {
  //   // if(commentsExpanded && comments.length === 0){
  //   //   const mockComments = getComments(id, page, COMMENT_OFFSET);
  //   //   setComments([...mockComments]);
  //   // }
  //   if(commentsExpanded){
  //     fetchComments(id, auth)
  //   }
  //   //fetchComments(id)
  // }, [commentsExpanded])
  
  // console.log("render", comments, commentsExpanded)

  // const commentText = commentCount === 1 ? `${commentCount} Comment` : `${commentCount} Comments`;
  const commentCount = commentIds.length;
  const commentText = commentCount === 1 ? `${commentCount} Comment` : `${commentCount} Comments`;

  return (
    <View style={styles.container}>
      <Text style={[styles.captionText, styles.categoryCaption]}>{currentCategory}</Text>
      <Text style={[styles.headingText, styles.title]}>{title}</Text>
      <Text style={[styles.bodyText, styles.description]}>{body}</Text>
      <View style={styles.bottom}>
        <View style={styles.actionGroup}>
          <TouchableOpacity onPress={handleCommentsPress}>
            <Text style={[styles.linkText]}>{commentText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCommentsPress}>
            <Text style={[styles.linkText, styles.actionMember]}>^</Text>
          </TouchableOpacity>
          {/* <Button image={SETTINGS} onPress={handleUpvotePress} styles={{}} type={RouteNames.PROFILE_USER === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC} />
          <Button title={"+"} onPress={handleDownvotePress} styles={{}} type={RouteNames.PROFILE_WELCOME === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC} /> */}
          <Button image={UP} onPress={handleUpvotePress} styles={{}} />
          <Button image={SETTINGS} onPress={handleUpvotePress} styles={{}} />
        </View>
        <TouchableOpacity onPress={handleUsernamePress} style={{flexDirection: 'row'}}>
          {/* <View style={{flexDirection: 'row'}}> */}
            <Text style={styles.captionText}>{`Posted by `}</Text>
            <Text style={styles.userCaption}>{`${username} `}</Text>
            <Text style={styles.captionText}>{`| ${createdTimestamp}`}</Text>
          {/* </View> */}
        </TouchableOpacity>
      </View>
      {/* <Button title='upvote' onPress={() => upvote(id, false, auth)}/>
      <Button title='upvote' onPress={() => upvote(id, true, auth)}/> */}
      {commentsExpanded ? 
        (<>
          <CommentsList commentIds={commentIds} comments={comments} postId={id} makeComment={makeComment} fetchComments={fetchComments} auth={auth} />
          {commentsLoading && <ActivityIndicator style={{marginTop: 16}} />}
          <View style={{margin: 32}}>
            <Text style={{alignSelf: 'center', color: colors.textLowlight}}>{"Failed loading data..."}</Text>
            <Link onPress={() => {fetchComments(id)}} textLink={"Retry"} style={{alignSelf: 'center', marginTop: 8}}/>
          </View>
        </>) : null
      }
    </View>
  )
}

const stpPost = (state) => ({comments: state.comments, commentsLoading: state.commentsLoading, commentsError: state.commentsError, auth: state.auth});
const dtpPost  = (dispatch) => ({
  fetchComments: fetchComments(dispatch),
  makeComment: makeComment(dispatch),
  upvote: upvote(dispatch),
})
export const Post = connect(stpPost , dtpPost )(RawPost);



function RawDiscussHome(props){

  const {currentCategory, navigation, feed, posts, feedLoading, postsError, fetchPosts, auth} = props
  console.log("QZ", feed)
  const postsByCategory = feed[currentCategory].map(item => posts[item])
  const categoryId = categories.find(item => item.name === currentCategory) || 0

  // console.log("PZ", feed, currentCategory, postsByCategory)

  React.useEffect(() => {
    // loading(currentCategory)
    // console.log("BZ", currentCategory)
    // const filtered = currentCategory === CategoryNames.HOME ? 
    //   mockFeedResponse :
    //   mockFeedResponse.filter(item => item.categories.includes(currentCategory))
    // const data = {
    //   category: currentCategory,
    //   data: filtered,
    // }
    // const rand = Math.random();
    // console.log("RANDZ", rand, data)

    const categoryId = categories.find(item => item.name === currentCategory)?.id || -1
    //fetchPosts(1, 1)
    fetchPosts(categoryId, auth)

    // setTimeout(() => {
    //   if(rand > 0.01){
    //     get(data);
    //   }else{
    //     error(currentCategory)
    //   }
    // }, 1000)

  }, [currentCategory])

  // const { getPostsWithCommentIdsAndUpvotes } = store;
  // const [currentPage, setCurrentPage] = React.useState(0);
  // const posts = getPostsWithCommentIdsAndUpvotes(currentCategory, 0, POST_PAGE_OFFSET);

  console.log("PZZZ", postsByCategory)

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
          data={postsByCategory}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item}) => <Post {...item} currentCategory={currentCategory} navigation={navigation} />}
          ItemSeparatorComponent={() => <Separator />}
        />
      </View>
      {feedLoading[currentCategory] && <ActivityIndicator style={{marginTop: 16}} />}
      <View style={{margin: 32}}>
        <Text style={{alignSelf: 'center', color: colors.textLowlight}}>{"Failed loading data..."}</Text>
        <Link onPress={() => {fetchPosts(categoryId, 1)}} textLink={"Retry"} style={{alignSelf: 'center', marginTop: 8}}/>
      </View>
    </Card>
  )
}

const stpDiscussHome = (state) => ({
  feed: state.feed,
  posts: state.posts,
  feedLoading: state.feedLoading,
  feedError: state.feedError,
  auth: state.auth,
});
const dtpDiscussHome  = (dispatch) => ({
  fetchPosts: fetchPosts(dispatch), 
  // get: (data) => dispatch({type: "POSTS_SUCCESS", payload: data}),
  // loading: (category) => dispatch({type: "POSTS_LOADING", payload: category}),
  // error: (category) => dispatch({type: "POSTS_ERROR", payload: category}),
})

export const DiscussHome = connect(stpDiscussHome , dtpDiscussHome )(RawDiscussHome);

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
  userCaption: {
    color: colors.link,
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
    borderColor: 'green',
    borderWidth: 1,
  },
  actionMember: {
    marginLeft: 16,
  },
  separator: {
    marginTop: 12,
    marginBottom: 12,
  }
})
