import { CategoryNames } from "../constants";

const mockUsers = [
  {
    id: 1,
    username: 'Alice123',
  },
  {
    id: 2,
    username: 'Bob123',
  },
  {
    id: 3,
    username: 'Casey123',
  },
  {
    id: 4,
    username: 'Devin123',
  },
  {
    id: 5,
    username: 'Erika123',
  },
  {
    id: 6,
    username: 'Frank123',
  },
  {
    id: 7,
    username: 'Gabe123',
  },
  {
    id: 8,
    username: 'Hugo123',
  },
  {
    id: 9,
    username: 'Ivan123',
  }
]

const mockPosts = [
  {
    id: 1,
    userId: 1,
    //category: CategoryNames.AAA,
    category: "Aaa",
    title: 'horses',
    description: 'are cool',
    // upVotes: 5,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    userId: 2,
    //category: CategoryNames.HOME,
    category: "Home",
    title: 'traveling is fun',
    description: 'I like to travel',
    // upVotes: 5,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    userId: 5,
    //category: CategoryNames.AAA,
    category: "Aaa",
    title: 'cars',
    description: 'so fast',
    // upVotes: 5,
    createdTimestamp: '2023-05-12',
    updatedTimestamp: '2023-07-21',
  },
];

const mockPostUpvotes = [
  {
    id: 1,
    postId: 1,
    userId: 2,
  },
  {
    id: 2,
    postId: 1,
    userId: 3,
  },
  {
    id: 3,
    postId: 1,
    userId: 4,
  },
  {
    id: 4,
    postId: 2,
    userId: 17,
  },
];

const mockComments = [
  {
    id: 1,
    userId: 1,
    postId: 1,
    text: 'wow you are right',
    // upVotes: 2,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-02',
  },
  {
    id: 2,
    userId: 1,
    postId: 1,
    text: 'they really are',
    // upVotes: 2,
    createdTimestamp: '2023-05-02',
    updatedTimestamp: '2023-07-09',
  },
  {
    id: 3,
    userId: 2,
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
  },
  {
    id: 2,
    commentId: 1,
    userId: 5,
  },
  {
    id: 3,
    commentId: 1,
    userId: 7,
  },
  {
    id: 4,
    commentId: 1,
    userId: 8,
  },
  {
    id: 5,
    commentId: 2,
    userId: 12,
  },
  {
    id: 6,
    commentId: 2,
    userId: 15,
  },
  {
    id: 7,
    commentId: 3,
    userId: 23,
  },
];

export function getComments(postId: number, page: number, count: number){
  const comments = mockComments
    .filter(comment => comment.postId = postId)
    .filter((item, idx) => idx >= page * count && idx < (page + 1) * count)
  console.log(comments)
  return comments;
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
