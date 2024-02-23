// import React from 'react';
// import { Text, View, Modal, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
// import { ButtonType, Button  } from '../../components/core/Button';
// import { Card } from '../../components/core/Card';
// import { colors } from '../../context/themes';
// import { store } from '../../state/basicStore';
// import { Dropdown } from '../../components/core/Dropdown';
// import { CategoryNames, RouteNames, categories } from '../../constants/constants';
// import { SelectedItems } from '../../components/common/SelectedItems';
// import { getCompanies } from '../../services/DiscoverService';
// import { RTextInput } from '../../components/core/RTextInput';
// import { RLabeledTextInput } from '../../components/core/RLabeledTextInput';
// import { connect } from '../../state/reduxStore';
// import { makeComment, makePost, upvotePost } from '../../services/DiscussService';
// import { Heading } from '../../components/common/Heading';

// function CommentsList({commentIds, comments, commentsLoading, commentsError, postId, makeComment, fetchComments, navigation, auth}){

//   const handleSubmitComment = (input) => {
//     console.log("Commented", input)
//     // make API call
//     // if succcessful call passed in function to store the new state
//     makeComment(postId, "comment text here")
//   }

//   const loadComments = () => {
//     console.log("SOMELOGW")
//     const count = getCount(commentIds, comments)
//     // const hasAll = checkHasAll(commentIds, comments)
//     if(count !== commentIds.length) {
//       const page = Math.floor(count / COMMENTS_COUNT_PER_PAGE) + 1;
//       console.log("PAGEW", page)
//       fetchComments(postId, auth, page)
//     }else{
//       console.log("NOTTHERE")
//     }
//   }

//   React.useEffect(() => {
//     loadComments()
//   }, [])
  
//   const commentList = commentIds
//     .map(commentId => comments[commentId])
//     .filter(item => !!item)
//     .toSorted((a, b) => b.id - a.id)
//   console.log({commentIds, comments, commentList})

//   const showLoadMore = commentIds.length !== commentList.length;

//   return (
//     <View>
//       <FlatList
//         style={{borderLeftWidth: 0.5, borderColor: colors.border, paddingLeft: 24, marginTop: 12}}
//         data={commentList}
//         renderItem={({item}) => {
//           return <Comment {...item} navigation={navigation}/>
//         }}
//         keyExtractor={(item) => item.id}
//         ItemSeparatorComponent={() => <Separator style={styles.separator}/>}
//       />
//       {showLoadMore && (<Link onPress={loadComments} textLink={"Load More Comments..."} style={{alignSelf: 'center'}}/>)}
//       <View style={{marginLeft: 32, marginRight: 32, marginTop: 16}}>
//         <InputBar
//           onPress={handleSubmitComment}
//           // title={"^"}
//           image={UP}
//           imageSize={10}
//           placeholder={"Reply with a comment"}
//           numLines={6}
//         />
//       </View>
//       {commentsLoading && <ActivityIndicator style={{marginTop: 16}} />}
//       {commentsError && (
//         <View style={{margin: 32}}>
//           <Text style={{alignSelf: 'center', color: colors.textRegular}}>{"Failed loading comments..."}</Text>
//           <Link
//             onPress={loadComments}
//             textLink={"Retry"}
//             style={{alignSelf: 'center', marginTop: 8}}
//           />
//         </View>
//       )}

//     </View>
//   )
// }

// export function RawDiscussCreatePost(props){

//   const { id, title, body, user, commentIds, userVote, numUpvotes, numDownvotes, createdTimestamp, currentCategory, navigation, fetchComments, makeComment, comments, commentsLoading, commentsError, upvotePost, auth} = props
//   const {id: userId, username} = user;

//   const [commentsExpanded, setCommentsExpanded] = React.useState(false);

//   // const handlePostPress = () => {
//   //   navigation.navigate(RouteNames.DISCUSS_POST_DETAIL, {postId: id})
//   // }

//   const handleCommentsPress = () => {
//     setCommentsExpanded(!commentsExpanded)
//   }

//   const handleUsernamePress = () => {
//     navigation.navigate(RouteNames.PROFILE_USER_OTHER, {id: userId, username})
//   }

//   const handleUpvotePress = () => {
//     upvotePost(id, true)
//   }

//   const handleDownvotePress = () => {
//     upvotePost(id, false)
//   }

//   const commentCount = commentIds.length;
//   const commentText = commentCount === 1 ? `${commentCount} Comment` : `${commentCount} Comments`;

//   return (
//     <View style={styles.container}>
//       {/* <TouchableOpacity onPress={handlePostPress}> */}
//         <Text style={styles.captionText}>{currentCategory}</Text>
//         <Text style={[styles.headingText, styles.title]}>{title}</Text>
//         <Text style={[styles.bodyText, styles.description]}>{body}</Text>
//       {/* </TouchableOpacity> */}
//       <View style={styles.bottom}>
//         <View style={styles.actionGroup}>
//           <TouchableOpacity onPress={handleCommentsPress}>
//             <Text style={[styles.linkText]}>{commentText}</Text>
//           </TouchableOpacity>
//             <Text style={{marginLeft: 8, fontSize: 12, color: colors.textRegular}}>{`${numUpvotes - numDownvotes} Upvotes`}</Text>
//             <TouchableOpacity onPress={handleUpvotePress} style={{marginLeft: 8}}>
//               <Image source={userVote > 0 ? UPVOTE_ACTIVE : UPVOTE_DEFAULT} style={{height: 16, width: 16}} />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={handleDownvotePress} style={{marginLeft: 8}}>
//               <Image source={userVote < 0 ? DOWNVOTE_ACTIVE : DOWNVOTE_DEFAULT} style={{height: 16, width: 16}}  />
//             </TouchableOpacity>
//         </View>
//         <View style={{flexDirection: 'row'}}>
//           <Text style={styles.captionText}>{`Posted by `}</Text>
//           {username ? (<TouchableOpacity onPress={handleUsernamePress}>
//             <Text style={styles.userCaption}>{`${username} `}</Text>
//           </TouchableOpacity>) : <Text style={styles.captionText}>{"@User "}</Text>} 
//           <Text style={styles.captionText}>{`| ${getDateText(createdTimestamp)}`}</Text>
//         </View>
//       </View>
//       {/* {commentsExpanded ? 
//         (<> */}
//           <CommentsList commentIds={commentIds} comments={comments} commentsLoading={commentsLoading} commentsError={commentsError} postId={id} makeComment={makeComment} fetchComments={fetchComments} navigation={navigation} auth={auth} />
//         {/* </>) : null
//       } */}
//     </View>
//   )
// }

// const stpPost = (state) => ({comments: state.comments, commentsLoading: state.commentsLoading, commentsError: state.commentsError, auth: state.auth});
// const dtpPost  = (dispatch, getState) => ({
//   fetchComments: fetchComments(dispatch),
//   makeComment: makeComment(dispatch),
//   upvotePost: upvotePost(dispatch, getState),
// })
// export const Post = connect(stpPost , dtpPost )(RawPost);
// }

// const stp = (state) => ({
//   skills: state.skills,
//   auth: state.auth,
// })
// const dtp = (dispatch) => ({
//   makePost: makePost(dispatch),
// });
// export const DiscussCreatePost = connect(stp, dtp)(RawDiscussCreatePost);


// const styles = StyleSheet.create({
//   container: {
//     // borderColor: 'red',
//     // borderWidth: 2,
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   inputContainer: {
//     marginTop: 32,
//   },
//   captionText: {
//     color: colors.textRegular,
//     fontSize: 12,
//   },
//   userCaption: {
//     color: colors.link,
//     fontSize: 12,
//   },
//   headingText: {
//     color: colors.textHighlight,
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   bodyText: {
//     color: colors.textRegular,
//     fontSize: 12,
//   },
//   linkText: {
//     color: colors.link,
//     fontSize: 12,
//   },
//   title: {
//     marginTop: 8,
//   },
//   description: {
//     marginTop: 8,
//   },
//   link: {
//     marginTop: 16,
//   },
//   bottom: {
//     flexDirection: 'row',
//     marginTop: 16,
//     justifyContent: 'space-between',
//   },
//   actionGroup: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     borderColor: 'green',
//     // borderWidth: 1,
//   },
//   actionMember: {
//     marginLeft: 16,
//   },
//   separator: {
//     marginTop: 12,
//     marginBottom: 12,
//   },
//   voteButton: {
//     paddingLeft: 4,
//     paddingRight: 4,
//     paddingTop: 4,
//     paddingBottom: 4,
//     margin: 4,
//     borderRadius: 2,
//     fontSize: 12,
//     // borderColor: 'red',
//     // borderWidth: 1,
//   },
// })

export function DiscussPostDetail() {};
