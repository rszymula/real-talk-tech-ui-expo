import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Card } from '../../components/core/Card';
import { InputBar } from '../../components/core/InputBar';
import { Separator } from '../../components/core/Separator';
import { RouteNames, INPUT_PLACEHOLDER, CategoryNames } from '../../constants/constants';
import { colors } from '../../context/themes';
// import { getComments, getPostsWithCommentIdsAndUpvotes } from '../services/DiscussService';
import { store } from '../../state/basicStore';
import { connect } from '../../state/reduxStore';
import { mockFeedResponse } from '../../data/discussMocks';
import { Link } from '../../components/core/Link';
import { fetchComments, fetchPosts, makeComment } from '../../services/DiscussService';
import { createUser } from '../../services/UserServices';

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
        <Text style={[styles.bodyText, styles.description]}>{text}</Text>
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

function Post({ id, title, body, user, commentIds, createdTimestamp, currentCategory, navigation }){

  console.log("AZ", title, body)
  const {id: userId, username} = user;

  const { getComments } = store;

  const commentCount = commentIds?.length || 0;

  const [commentsExpanded, setCommentsExpanded] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [comments, setComments] = React.useState([]);

  const handleCommentsPress = () => {
    setCommentsExpanded(!commentsExpanded)
  }

  const handleUsernamePress = () => {
    navigation.navigate(RouteNames.PROFILE_USER_OTHER, {id: userId})
  }

  React.useEffect(() => {
    if(commentsExpanded && comments.length === 0){
      
      const mockComments = getComments(id, page, COMMENT_OFFSET);

      setComments([...mockComments]);
    }
  }, [commentsExpanded])
  
  // console.log("render", comments, commentsExpanded)

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
        </View>
        <TouchableOpacity onPress={handleUsernamePress}>
          <Text style={[styles.captionText, styles.userCaption]}>{`${username} | ${createdTimestamp}`}</Text>
        </TouchableOpacity>
      </View>
      {commentsExpanded ? <CommentsList comments={comments} /> : null}
    </View>
  )
}

function RawDiscussHome(props){

  const {currentCategory, navigation, posts, postsLoading, postsError, getPosts} = props
  console.log("QZ", posts)
  const postsByCategory = posts[currentCategory]

  console.log("PZ", posts, currentCategory, postsByCategory)

  React.useEffect(() => {
    console.log("FUUUZZ", currentCategory)
    // loading(currentCategory)
    console.log("BZ", currentCategory)
    const filtered = currentCategory === CategoryNames.HOME ? 
      mockFeedResponse :
      mockFeedResponse.filter(item => item.categories.includes(currentCategory))
    const data = {
      category: currentCategory,
      data: filtered,
    }
    const rand = Math.random();
    console.log("RANDZ", rand, data)


    //fetchPosts(1, 1)

    getPosts(1, 1)

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
      {postsLoading[currentCategory] && <ActivityIndicator style={{marginTop: 16}} />}
      <View style={{margin: 32}}>
        <Text style={{alignSelf: 'center', color: colors.textLowlight}}>{"Failed loading data..."}</Text>
        <Link onPress={() => {}} textLink={"Retry"} style={{alignSelf: 'center', marginTop: 8}}/>
      </View>
    </Card>
  )
}

const stp = (state) => ({posts: state.posts, postsLoading: state.postsLoading, postsError: state.postsError});
const dtp = (dispatch) => ({
  getPosts: fetchPosts(dispatch), 
  // get: (data) => dispatch({type: "POSTS_SUCCESS", payload: data}),
  // loading: (category) => dispatch({type: "POSTS_LOADING", payload: category}),
  // error: (category) => dispatch({type: "POSTS_ERROR", payload: category}),
})

export const DiscussHome = connect(stp, dtp)(RawDiscussHome);

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
