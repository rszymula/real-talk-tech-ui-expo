
const mockPosts = [
  {
    id: 1,
    //category: CategoryNames.AAA,
    category: "Aaa",
    title: 'horses',
    description: 'are cool',
    upVotes: 5,
    created: '2023-01-02',
    updated: '2023-01-03',
  },
  {
    id: 2,
    //category: CategoryNames.HOME,
    category: "Home",
    title: 'traveling is fun',
    description: 'I like to travel',
    upVotes: 5,
    created: '2023-01-02',
    updated: '2023-01-03',
  }
]

const mockComments = [
  {
    id: 1,
    postId: 1,
    text: 'wow you are right',
    upVotes: 2,
    created: '2023-01-02',
    updated: '2023-01-02',
  },
  {
    id: 2,
    postId: 1,
    text: 'they really are',
    upVotes: 2,
    created: '2023-05-02',
    updated: '2023-07-09',
  },
  {
    id: 3,
    postId: 2,
    text: 'I went to Europe last summer man',
    upVotes: 2,
    created: '2023-02-23',
    updated: '2023-02-23',
  },
]

export function getPostsWithComments(page: number, count: number){
  const posts = mockPosts.filter((item, idx) => idx >= page * count && idx < (page + 1) * count)
  const postsWithComments = posts.map(post => ({...post, comments: mockComments.filter(comment => comment.postId === post.id)}));
  return postsWithComments;
}
