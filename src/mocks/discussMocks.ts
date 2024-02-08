import { CategoryNames } from "../constants";

export const mockCommentTag = [
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

export const mockCategories = [
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

export const mockUsers = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "In Wonderland",
    bio: "rabbits and mad hatters and down down the rabbit hole and the queen of heards and feeling bigger or smaller and so on",
    username: 'Alice123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Thebuilder",
    bio: "TBD",
    username: 'Bob123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    firstName: "Casey",
    lastName: "Idk",
    bio: "TBD",
    username: 'Casey123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 4,
    firstName: "Devin",
    lastName: "Neighbor",
    bio: "TBD",
    username: 'Devin123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 5,
    firstName: "Erika",
    lastName: "Gf",
    bio: "TBD",
    username: 'Erika123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 6,
    firstName: "Frank",
    lastName: "FatherInLaw?",
    bio: "TBD",
    username: 'Frank123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 7,
    firstName: "Gabe",
    lastName: "Skydive",
    bio: "TBD",
    username: 'Gabe123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 8,
    firstName: "Hugo",
    lastName: "Frenchman",
    bio: "TBD",
    username: 'Hugo123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 9,
    firstName: "Hugo",
    lastName: "AndIvanka",
    bio: "TBD",
    username: 'Ivan123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  }
]

export const mockPosts = [
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

export const mockPostUpvotes = [
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

export const mockComments = [
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

export const mockCommentUpvotes = [
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


export const mockFeedResponse = [
  {
    "id" : 41,
    "title" : "Mock title 41",
    "body" : "Mock body 41",
    "user" : {
      "id" : 2,
      "username" : "test_user"
    },
    "vendors" : [
      "vendor3"
    ],
    "categories" : [
      "Engineering"
    ],
    "commentCount" : 0,
    "upvoteCount" : 0,
    "userUpvote" : null,
    "createdTimestamp" : "2024-02-07T21:05:15.286000",
  },
  {
    "id" : 42,
    "title" : "Mock title 42",
    "body" : "Mock body 42",
    "user" : {
      "id" : 2,
      "username" : "test_user"
    },
    "vendors" : [
      "vendor3"
    ],
    "categories" : [
      "Engineering"
    ],
    "commentCount" : 0,
    "upvoteCount" : 0,
    "userUpvote" : null,
    "createdTimestamp" : "2024-02-07T21:05:15.286000",
  },
  {
    "id" : 43,
    "title" : "Mock title 43",
    "body" : "Mock body 43",
    "user" : {
      "id" : 2,
      "username" : "test_user"
    },
    "vendors" : [
      "vendor3"
    ],
    "categories" : [
      "Operations"
    ],
    "commentCount" : 0,
    "upvoteCount" : 0,
    "userUpvote" : null,
    "createdTimestamp" : "2024-02-07T21:05:15.286000",
  },
]
