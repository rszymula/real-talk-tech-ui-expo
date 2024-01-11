import { CategoryNames } from "../constants";

const mockPosts = [
  {
    id: 1,
    userId: 1,
    //category: CategoryNames.AAA,
    category: "Aaa",
    title: 'horses',
    description: 'are cool',
    // upVotes: 5,
    created: '2023-01-02',
    updated: '2023-01-03',
  },
  {
    id: 2,
    userId: 2,
    //category: CategoryNames.HOME,
    category: "Home",
    title: 'traveling is fun',
    description: 'I like to travel',
    // upVotes: 5,
    created: '2023-01-02',
    updated: '2023-01-03',
  }
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
    created: '2023-01-02',
    updated: '2023-01-02',
  },
  {
    id: 2,
    userId: 1,
    postId: 1,
    text: 'they really are',
    // upVotes: 2,
    created: '2023-05-02',
    updated: '2023-07-09',
  },
  {
    id: 3,
    userId: 2,
    postId: 2,
    text: 'I went to Europe last summer man',
    // upVotes: 2,
    created: '2023-02-23',
    updated: '2023-02-23',
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

export function getPostsWithCommentIdsAndUpvotes(category: CategoryNames, page: number, count: number){
  const posts = mockPosts
    .filter(item => item.category === category)
    .filter((item, idx) => idx >= page * count && idx < (page + 1) * count)
  const postsWithCommentIds = posts.map(post => {
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
  return postsWithCommentIdsAndUpvotes;
}
