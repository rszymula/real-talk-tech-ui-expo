// import { CategoryNames } from "../constants";

import { categories } from "../constants/constants";

const mockCommentTag = [
  {
    id: 1,
    commentId: 2,
    taggedUserId: 5,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 1,
    commentId: 5,
    taggedUserId: 3,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
];

export enum CategoryNames {
  HOME = "Home",
  AI = 'AI',
  ENGINEERING = 'Engineering',
  OPERATIONS = 'Operations',
  MARKETING = 'Marketing',
  SALES = 'Sales',
  CUSTOMER_SUCCESS = 'Customer Success',
  DATA = 'Data',
  PRODUCT = 'Product',
  HR_AND_TALENT = 'HR & Talent',
  FINANCE = 'Finance',
  LEADERHIP_EXEC = 'Leadership/Exec',
  FOUNDER = 'Founder',
  INVESTOR_VC = 'Investor/VC',
};

const mockCategories = [
  {
    id: 0,
    name: CategoryNames.HOME,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 1,
    name: CategoryNames.ENGINEERING,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    name: CategoryNames.OPERATIONS,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    name: CategoryNames.MARKETING,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 4,
    name: CategoryNames.SALES,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 5,
    name: CategoryNames.CUSTOMER_SUCCESS,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 6,
    name: CategoryNames.DATA,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 7,
    name: CategoryNames.PRODUCT,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 8,
    name: CategoryNames.HR_AND_TALENT,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 9,
    name: CategoryNames.FINANCE,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 10,
    name: CategoryNames.LEADERHIP_EXEC,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 11,
    name: CategoryNames.FOUNDER,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 12,
    name: CategoryNames.INVESTOR_VC,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
];

const mockUsers = [
  {
    id: 1,
    username: 'Alice123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    username: 'Bob123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    username: 'Casey123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 4,
    username: 'Devin123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 5,
    username: 'Erika123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 6,
    username: 'Frank123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 7,
    username: 'Gabe123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 8,
    username: 'Hugo123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 9,
    username: 'Ivan123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  }
]

const mockPosts = [
  {
    id: 1,
    userId: 1,
    categoryId: 1,
    category: 'Engineering',
    title: 'horses',
    description: 'are cool',
    // upVotes: 5,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    userId: 2,
    categoryId: 0,
    category: "Home",
    title: 'traveling is fun',
    description: 'I like to travel',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    userId: 5,
    categoryId: 1,
    category: 'Engineering',
    title: 'cars',
    description: 'so fast',
    createdTimestamp: '2023-05-12',
    updatedTimestamp: '2023-07-21',
  },
  {
    id: 3,
    userId: 5,
    categoryId: 1,
    category: 'Engineering',
    title: 'ships',
    description: 'vrooooomm',
    createdTimestamp: '2023-05-12',
    updatedTimestamp: '2023-07-21',
  },
];

const mockPostUpvotes = [
  {
    id: 1,
    postId: 1,
    userId: 2,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    postId: 1,
    userId: 3,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    postId: 1,
    userId: 4,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 4,
    postId: 2,
    userId: 17,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
];

const mockComments = [
  {
    id: 1,
    userId: 3,
    postId: 1,
    text: 'wow you are right',
    // upVotes: 2,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-02',
  },
  {
    id: 2,
    userId: 5,
    postId: 1,
    text: 'they really are',
    // upVotes: 2,
    createdTimestamp: '2023-05-02',
    updatedTimestamp: '2023-07-09',
  },
  {
    id: 3,
    userId: 8,
    postId: 2,
    text: 'I went to Europe last summer man',
    // upVotes: 2,
    createdTimestamp: '2023-02-23',
    updatedTimestamp: '2023-02-23',
  },
]

const mockCommentUpvotes = [
  {
    id: 1,
    commentId: 1,
    userId: 2,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    commentId: 1,
    userId: 5,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    commentId: 1,
    userId: 7,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 4,
    commentId: 1,
    userId: 8,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 5,
    commentId: 2,
    userId: 12,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 6,
    commentId: 2,
    userId: 15,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 7,
    commentId: 3,
    userId: 23,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
];

export function getComments(postId: number, page: number, count: number){
  const comments = mockComments
    .filter(comment => {
      return (comment.postId === postId)
    })
    .filter((item, idx) => idx >= page * count && idx < (page + 1) * count)
  console.log("filtered", {postId, page, count }, comments)

  const commentsWithUsername = comments.map(comment => {
    return { ...comment, username: mockUsers.find(user => user.id === comment.userId)
      ?.username || ''};
  })

  return commentsWithUsername;
}

export function getPostsWithCommentIdsAndUpvotes(category: CategoryNames, page: number, count: number){
  const posts = mockPosts
    .filter(item => item.category === category)
    .filter((item, idx) => idx >= page * count && idx < (page + 1) * count)

  const postsWithUsername = posts.map(post => {
    return {
      ...post,
      username: mockUsers.find(user => user.id === post.userId)
        ?.username || ''
    }
  });

  const postsWithCommentIds = postsWithUsername.map(post => {
      return {
        ...post,
        commentIds: mockComments
          .filter(comment => comment.postId === post.id)
          .map(comment => comment.id)
      }
    }
  );

  const postsWithCommentIdsAndUpvotes = postsWithCommentIds.map(post => {
    return {
      ...post,
      upVotes: mockPostUpvotes
        .filter(upvote => upvote.postId === post.id)
        .reduce((acu) => acu + 1, 0)
      }
    }
  );

  console.log(postsWithCommentIdsAndUpvotes)

  return postsWithCommentIdsAndUpvotes;
}



/*
const returnedPosts = {
  metadata: {  (we already know this stuff, but still nice to have)
    categoryId: null,
    userId: 1,
    page: 0,
    count: 4,
  },
  posts: [
    {
      id: 1,
      user: {
        id: 3,
        username: "Janie",
      },
      categoryId: 1, (needed for the all categories call. For the specific categories calls, can be omitted but could keep it in for simplicity)
      commentIds: [1, 2, 3, ....],
      title: 'horses',
      description: 'are cool',
      upvotes: 5,
      userVote: -1, (How current user votes on this post. Can be -1, 0, or 1. Have this come back as a nullable boolean?)
      createdTimestamp: '2023-01-02',
      updatedTimestamp: '2023-01-03',
    },
    {
      id: 2,
      user: {
        id: 5,
        username: "Bob",
      },
      categoryId: 2,  (needed for the all categories call. For the specific categories calls, can be omitted but could keep it in for simplicity)
      commentIds: [8, 9, 23, 45, ....],
      title: 'traveling is fun',
      description: 'I like to travel',
      upvotes: 5,
      userUpvotes: 0, (How current user votes on this post. Can be -1, 0, or 1. Have this come back as a nullable boolean?)
      createdTimestamp: '2023-01-02',
      updatedTimestamp: '2023-01-03',
    },
    ...
  ]


}
*/



/*

const mockComments = {
  metadata: {  (we already know this stuff, but still nice to have)
    postId: 1,
    userId: 1,
    page: 0,
    count: 10,
  },
  comments: [
    {
      id: 1,
      user: {
        id: 8,
        username: "Joey",
      },
      text: 'wow you are right',
      upvotes: 82,
      userUpvotes: 1, (How current user votes on this post. Can be -1, 0, or 1. Have this come back as a nullable boolean?)
      createdTimestamp: '2023-01-02',
      updatedTimestamp: '2023-01-02',
    },
    {
      id: 2,
      user: {
        id: 18,
        username: "Marisa",
      },
      text: 'they really are',
      upvotes: 2,
      userUpvotes: -1, (How current user votes on this post. Can be -1, 0, or 1. Have this come back as a nullable boolean?)
      createdTimestamp: '2023-05-02',
      updatedTimestamp: '2023-07-09',
    },
  ],
};

*/


export function fetchPosts(dispatch){
  return (categoryId, userId, page = 1) => {
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/feed?categoryId=${categoryId}&userId=${userId}`
    fetch(url).then(res => {
      return res.json()
    }).then(json => {
      console.log("XYZ", json)
      dispatch({type: "POSTS_SUCCESS", payload: {category: categories.find(cat => cat.id === categoryId)?.name, data: json.posts}})
    })
  }
}

export function fetchComments(dispatch){
  return (postId, page = 1) => {
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/getCommentsForPost?postId=45`
    fetch(url).then(res => {
      return res.json()
    }).then(json => {
      console.log("ZCOMMENTS", json)
      dispatch({type: "POSTS_SUCCESS", payload: json.posts})
    })
  }
}

export function makeComment(dispatch){
  return (postId) => {
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/makeComment`
    const params = {
      method: "POST",
      
      body: JSON.stringify({
        postId: 45,
        userId: 1,
        taggedUsernames: [],
        commentText: "hey there",
      })
    }
    fetch(url, params).then(res => {
      // return res.json()
      return res.text()
    }).then(json => {
      console.log("ZCOMMENTS", json)
      dispatch({type: "POSTS_SUCCESS", payload: json})
    }).catch((err) => {
      console.log("ERRZ", err)
    })
  }
}
