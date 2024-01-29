import { CategoryNames } from "../constants";
import { mockFollowups, mockQuestions } from "../mocks/buyerAIMocks";
import { mockCompanies } from "../mocks/discoverMocks";
import { mockComments, mockPostUpvotes, mockPosts, mockUsers } from "../mocks/discussMocks";


function Store(){

  // const postsStore = []
  const postsStore = mockPosts
  // const usersStore = []
  const usersStore = mockUsers
  // const commentsStore = []
  const commentsStore = mockComments
  // const postUpvotesStore = []
  const postUpvotesStore = mockPostUpvotes
  // const companiesStore = []
  const companiesStore = mockCompanies
  // const questionsStore = []
  const questionsStore = mockQuestions
  // const followupsStore = []
  const followupsStore = mockFollowups

  function getPostsWithCommentIdsAndUpvotes(category: CategoryNames, page: number, count: number){
    const posts = postsStore
      .filter(item => item.category === category)
      .filter((item, idx) => idx >= page * count && idx < (page + 1) * count)
  
    const postsWithUsername = posts.map(post => {
      return {
        ...post,
        username: usersStore.find(user => user.id === post.userId)
          ?.username || ''
      }
    });
  
    const postsWithCommentIds = postsWithUsername.map(post => {
        return {
          ...post,
          commentIds: commentsStore
            .filter(comment => comment.postId === post.id)
            .map(comment => comment.id)
        }
      }
    );
  
    const postsWithCommentIdsAndUpvotes = postsWithCommentIds.map(post => {
      return {
        ...post,
        upVotes: postUpvotesStore
          .filter(upvote => upvote.postId === post.id)
          .reduce((acu) => acu + 1, 0)
        }
      }
    );
    return postsWithCommentIdsAndUpvotes;
  }

  function getComments(postId: number, page: number, count: number){
    const comments = commentsStore
      .filter(comment => {
        return (comment.postId === postId)
      })
      .filter((item, idx) => idx >= page * count && idx < (page + 1) * count)
    console.log("filtered", {postId, page, count }, comments)
  
    const commentsWithUsername = comments.map(comment => {
      return { ...comment, username: usersStore.find(user => user.id === comment.userId)
        ?.username || ''};
    })
    return commentsWithUsername;
  }

  function getCompanies(page = 0, count = 5){
    return companiesStore.filter((item, idx) => idx >= page * count && idx < (page + 1) * count);
  }
  
  function getCompany(id){
    return companiesStore.find(item => item.id === id);
  }

  function getMainQuestions(){
    const main = questionsStore.filter(item => item.main);
    return main;
  };
  
  function getOtherQuestions(){
    const other = questionsStore.filter(item => !item.main);
    return other;
  };
  
  function getFollowups(questionId){
    const filtered = followupsStore.filter(item => item.questionId === questionId)
    return filtered;
  }

  function createPost(post){
    postsStore.push(post)
  }


  return { getPostsWithCommentIdsAndUpvotes, getComments, getCompanies, getCompany, getMainQuestions, getOtherQuestions, getFollowups, createPost }
}

export const store = Store();

