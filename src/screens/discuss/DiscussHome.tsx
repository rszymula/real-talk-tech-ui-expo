import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Card } from '../../components/core/Card';
import { InputBar } from '../../components/core/InputBar';
import { Separator } from '../../components/core/Separator';
import { RouteNames, INPUT_PLACEHOLDER, CategoryNames, categories, POSTS_COUNT_PER_PAGE, COMMENTS_COUNT_PER_PAGE } from '../../constants/constants';
import { colors } from '../../context/themes';
// import { getComments, getPostsWithCommentIdsAndUpvotes } from '../services/DiscussService';
import { store } from '../../state/basicStore';
import { connect } from '../../state/reduxStore';
import { mockFeedResponse } from '../../data/discussMocks';
import { Link } from '../../components/core/Link';
import { fetchComments, fetchPosts, makeComment, upvotePost } from '../../services/DiscussService';
import { createUser } from '../../services/UserServices';
import { Button } from '../../components/core/Button';
import UP from '../../assets/up.png';
import SETTINGS from '../../assets/settings.png';
import UPVOTE_DEFAULT from '../../assets/upvote_default.png';
import UPVOTE_ACTIVE from '../../assets/upvote_active.png';
import DOWNVOTE_DEFAULT from '../../assets/downvote_default.png';
import DOWNVOTE_ACTIVE from '../../assets/downvote_active.png';
import moment from 'moment';

const POST_PAGE_OFFSET = 10;
const COMMENT_OFFSET = 10;

function getDateText(createdTimestamp){
  // const MS_IN_MIN = 60000
  const res = moment(new Date(createdTimestamp)).fromNow()
  // const stamp = moment(new Date(createdTimestamp))
  // const now = moment(new Date());
  // const res = now.diff(stamp);
  // if(res)
  console.log("RESSSS", res)
  return res
}


function Username(){

}

function Comment({commentText, username, upvotes, creationTime, navigation}) {
  console.log("oiuoiu", commentText)
  
  const handleUsernamePress = () => {
    navigation.navigate(RouteNames.PROFILE_USER_OTHER, {username})
  }

  return (
    <>
      <View>
        {/* <Text style={styles.captionText}>
          {`${username} | ${creationTime}`}
        </Text> */}
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.captionText}>
            {`Commented by `}
          </Text>
          {username ? (
              <TouchableOpacity onPress={handleUsernamePress}>
                <Text style={styles.userCaption}>
                  {`${username} `}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.captionText}>{"Anonymous "}</Text>)} 
          <Text style={styles.captionText}>{`| ${creationTime}`}</Text>
        </View>
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

function getCount(list, obj){
  // const keys = Object.keys(obj);
  // const hasAll = list.every(id => keys.includes(`${id}`))
  const count = list.reduce((accum, curr) => {
    if(obj[curr]){
      accum += 1
    }
  }, 0)
  return count
}

function CommentsList({commentIds, comments, commentsLoading, commentsError, postId, makeComment, fetchComments, navigation, auth}){

  const handleSubmitComment = (input) => {
    console.log("Commented", input)
    // make API call
    // if succcessful call passed in function to store the new state
    makeComment(postId, "comment text here")
  }

  const loadComments = () => {
    const count = getCount(commentIds, comments)
    // const hasAll = checkHasAll(commentIds, comments)
    if(count !== commentIds.length) {
      const page = Math.floor(count / COMMENTS_COUNT_PER_PAGE) + 1;
      fetchComments(postId, auth, page)
    }
  }

  React.useEffect(() => {
    loadComments()
  }, [])

  //const hasAll = checkHasAll(commentIds, comments)
  //const commentList = hasAll ? commentIds.map(commentId => comments[commentId]) : [];
  const commentList = commentIds.map(commentId => comments[commentId]).filter(item => !!item)
  console.log({commentIds, comments, commentList})

  return (
    <View>
      <FlatList
        style={{borderLeftWidth: 0.5, borderColor: colors.border, paddingLeft: 24, marginTop: 12}}
        data={commentList}
        renderItem={({item}) => {
          return <Comment {...item} navigation={navigation}/>
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Separator style={styles.separator}/>}
      />
      <View style={styles.inputContainer}>
        <InputBar
          onPress={handleSubmitComment}
          // title={"^"}
          image={UP}
          imageSize={10}
          placeholder={"Reply with a comment"}
        />
      </View>
      <Link onPress={loadComments} textLink={"Load More Comments..."} style={{alignSelf: 'center', margin: 16}}/>
      {commentsLoading && <ActivityIndicator style={{marginTop: 16}} />}
      {commentsError && (
        <View style={{margin: 32}}>
          <Text style={{alignSelf: 'center', color: colors.textLowlight}}>{"Failed loading comments..."}</Text>
          <Link
            onPress={loadComments}
            textLink={"Retry"}
            style={{alignSelf: 'center', marginTop: 8}}
          />
        </View>
      )}

    </View>
  )
}



function RawPost({ id, title, body, user, commentIds, userVote, numUpvotes, numDownvotes, createdTimestamp, currentCategory, navigation, fetchComments, makeComment, comments, commentsLoading, commentsError, upvotePost, auth}){

  const {id: userId, username} = user;

  const [commentsExpanded, setCommentsExpanded] = React.useState(false);

  const handleCommentsPress = () => {
    setCommentsExpanded(!commentsExpanded)
  }

  const handleUsernamePress = () => {
    navigation.navigate(RouteNames.PROFILE_USER_OTHER, {id: userId, username})
  }

  const handleUpvotePress = () => {
    upvotePost(id, true)
  }

  const handleDownvotePress = () => {
    upvotePost(id, false)
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
      <Text style={styles.captionText}>{currentCategory}</Text>
      <Text style={[styles.headingText, styles.title]}>{title}</Text>
      <Text style={[styles.bodyText, styles.description]}>{body}</Text>
      <View style={styles.bottom}>
        <View style={styles.actionGroup}>
          <TouchableOpacity onPress={handleCommentsPress}>
            <Text style={[styles.linkText]}>{commentText}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={handleCommentsPress}>
            <Text style={[styles.linkText, styles.actionMember]}>^</Text>
          </TouchableOpacity> */}
          {/* <Button image={SETTINGS} onPress={handleUpvotePress} styles={{}} type={RouteNames.PROFILE_USER === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC} />
          <Button title={"+"} onPress={handleDownvotePress} styles={{}} type={RouteNames.PROFILE_WELCOME === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC} /> */}
          {/* <Button image={UPVOTE_DEFAULT} onPress={handleUpvotePress} styles={styles.voteButton} />
          <Button image={DOWNVOTE_DEFAULT} onPress={handleUpvotePress} styles={styles.voteButton} /> */}
          {/* <View style={{backgroundColor: 'white'}}> */}
            {/* <Text>kjhsdkf</Text>
            <Image source={UP} style={{height: 16, width: 16}}/> */}
            <Text style={{marginLeft: 8, fontSize: 12, color: colors.textLowlight}}>{`${numUpvotes - numDownvotes} Upvotes`}</Text>
            <TouchableOpacity onPress={handleUpvotePress} style={{marginLeft: 8}}>
              <Image source={userVote > 0 ? UPVOTE_ACTIVE : UPVOTE_DEFAULT} style={{height: 16, width: 16}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDownvotePress} style={{marginLeft: 8}}>
              <Image source={userVote < 0 ? DOWNVOTE_ACTIVE : DOWNVOTE_DEFAULT} style={{height: 16, width: 16}}  />
            </TouchableOpacity>
          {/* </View> */}
        </View>
        <View style={{flexDirection: 'row'}}>
          {/* <View style={{flexDirection: 'row'}}> */}
            <Text style={styles.captionText}>{`Posted by `}</Text>
            {username ? (<TouchableOpacity onPress={handleUsernamePress}>
              <Text style={styles.userCaption}>{`${username} `}</Text>
            </TouchableOpacity>) : <Text style={styles.captionText}>{"Anonymous "}</Text>} 
            <Text style={styles.captionText}>{`| ${getDateText(createdTimestamp)}`}</Text>
          {/* </View> */}
        </View>
      </View>
      {/* <Button title='upvote' onPress={() => upvote(id, false, auth)}/>
      <Button title='upvote' onPress={() => upvote(id, true, auth)}/> */}
      {commentsExpanded ? 
        (<>
          <CommentsList commentIds={commentIds} comments={comments} commentsLoading={commentsLoading} commentsError={commentsError} postId={id} makeComment={makeComment} fetchComments={fetchComments} navigation={navigation} auth={auth} />
            {/* {commentsLoading && <ActivityIndicator style={{marginTop: 16}} />}
            {commentsError && (
              <View style={{margin: 32}}>
                <Text style={{alignSelf: 'center', color: colors.textLowlight}}>{"Failed loading comments..."}</Text>
                <Link
                  onPress={() => {
                    const hasAll = checkHasAll(commentIds, comments)
                    if(!hasAll) {
                      fetchComments(id, auth)
                    }
                  }}
                  textLink={"Retry"}
                  style={{alignSelf: 'center', marginTop: 8}}
                />
              </View>
            )} */}
        </>) : null
      }
    </View>
  )
}

const stpPost = (state) => ({comments: state.comments, commentsLoading: state.commentsLoading, commentsError: state.commentsError, auth: state.auth});
const dtpPost  = (dispatch, getState) => ({
  fetchComments: fetchComments(dispatch),
  makeComment: makeComment(dispatch),
  upvotePost: upvotePost(dispatch, getState),
})
export const Post = connect(stpPost , dtpPost )(RawPost);



function RawDiscussHome(props){

  const {currentCategory, navigation, feed, posts, feedLoading, feedError, fetchPosts, auth} = props
  console.log("QZ", feed)
  const postsByCategory = feed[currentCategory].map(item => posts[item])
  const categoryId = categories.find(item => item.name === currentCategory) || 0

  // console.log("PZ", feed, currentCategory, postsByCategory)

  const loadPosts = () => {
    const categoryId = categories.find(item => item.name === currentCategory)?.id || -1
    const page = postsByCategory.length / POSTS_COUNT_PER_PAGE + 1;
    //fetchPosts(1, 1)
    console.log("PAGEW", page)
    fetchPosts(categoryId, auth, page)
  }

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

    loadPosts()

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
  console.log("E2", feedError)

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
      <Link onPress={loadPosts} textLink={"Load More Posts..."} style={{alignSelf: 'center', margin: 16}}/>
      {feedLoading[currentCategory] && <ActivityIndicator style={{marginTop: 16}} />}
      {feedError[currentCategory] && (<View style={{margin: 32}}>
        <Text style={{alignSelf: 'center', color: colors.textLowlight}}>{"Failed loading data..."}</Text>
        <Link onPress={loadPosts} textLink={"Retry"} style={{alignSelf: 'center', marginTop: 8}}/>
      </View>)}
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
    // borderWidth: 1,
  },
  actionMember: {
    marginLeft: 16,
  },
  separator: {
    marginTop: 12,
    marginBottom: 12,
  },
  voteButton: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 4,
    borderRadius: 2,
    fontSize: 12,
    // borderColor: 'red',
    // borderWidth: 1,
  },
})
