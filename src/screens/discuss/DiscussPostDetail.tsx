import { Heading } from "../../components/common/Heading";
import { Card } from "../../components/core/Card";
import { connect } from "../../state/reduxStore"
import { Post } from "./components/Post";

export function RawDiscussPostDetail({navigation, route, posts}){

  const postId = route?.params?.postId;
  const post = posts[postId];


  return (
    <>
      <Heading navigation={navigation}>
      </Heading>
      <Card styles={{}}>
        <Post {...post} navigation={navigation} initCommentsExpanded truncateBody={false} />
      </Card>
    </>
  )
}
const stp = (state) => ({
  // feed: state.feed,
  posts: state.posts,
  // feedLoading: state.feedLoading,
  // feedError: state.feedError,
  auth: state.auth,
});
const dtp = (dispatch) => ({
  // fetchPosts: fetchPosts(dispatch), 
})
export const DiscussPostDetail = connect(stp, dtp)(RawDiscussPostDetail);
