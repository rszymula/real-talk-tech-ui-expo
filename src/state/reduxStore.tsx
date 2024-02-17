import React, { useContext } from 'react';
import { CategoryNames, categories } from '../constants/constants';

export const ReduxContext = React.createContext(undefined);

export function createStore(reducer){
  let state = reducer(undefined, {});
  // let onChange;
  let listeners = []
  return {
    getState: () => state,
    // subscribe: (func) => onChange = func,
    subscribe: (func) => {
      listeners.push(func);
      return () => {
        const idx = listeners.indexOf(func)
        listeners.splice(idx, 1)
      }
    },
    dispatch: (action) => {
      console.log("Dispatching")
      state = reducer(state, action)
      listeners.forEach(listener => listener())
    }
  }
}

const INDUSTRY_DEFAULT = [
  {
    id: 1,
    name: "industry1",
  },
  {
    id: 2,
    name: "industry2",
  }
];

const CATEGORIES_DEFAULT = categories//.map(item => item.name)

const INTERESTS_DEFAULT = [
  {
    id: 1,
    name: "interest1",
  },
  {
    id: 2,
    name: "interest2",
  },
  {
    id: 3,
    name: "interest3",
  },
  {
    id: 4,
    name: "interest4",
  },
  {
    id: 5,
    name: "interest5",
  }
];

const initialState = {
  industry: INDUSTRY_DEFAULT, // What industry are you in?
  categories: CATEGORIES_DEFAULT, // What do you do?
  interests: INTERESTS_DEFAULT, // What software / tech interests you?
  vendors: [{id: 1, name: "Asana"}, {id: 2, name: "Square"}],
  auth: {
    userId: -1,
    token: "",
  },
  users: {},
  userLoading: false,
  userError: null,
  feed: Object.values(CategoryNames).filter(item => isNaN(Number(item))).reduce((acc, item) => (acc[item] = [], acc), {}),
  posts: {},
  feedLoading: {},
  feedError: {},
  // comments: [],
  comments: {},
  commentsLoading: false,
  commentsError: null,
  companies: [1, 2],
  companiesLoading: false,
  companiesError: null,
  // questions: [],
  // usersLoading: false,
  // usersError: null,
  // followups: [],
  // usersLoading: false,
  // usersError: null,
  vendorGroups: {},
  vendorGroupsLoading: false,
  vendorGrouspError: null,
}

export function reducer(state = initialState, action){

  console.log("STOREW", state, action)
  switch(action.type){
    case 'POSTS_SUCCESS':
      console.log("ESZ", action)

      const logthis = {
        ...state.feed,
        [action.payload.category]:[
          ...state.feed[action.payload.category],
          ...action.payload.data
        ]
      }
      const res = {
        ...state,
        feed: {
          ...state.feed,
          [action.payload.category]:[
            ...state.feed[action.payload.category],
            ...action.payload.data.map(item => item.id)
          ]
        },
        posts: {
          ...state.posts,
          ...action.payload.data.reduce((accum, cur) => {
            const userVote = cur.userVote === true ? 1 : cur.userVote === false ? -1 : 0
            accum[cur.id] = {...cur, userVote }
            return accum;
          }, {}),
        },
        feedLoading: {
          ...state.feedLoading,
          [action.payload.category]: false,
        },
        feedError: {
          ...state.feedError,
          [action.payload.category]: false,
        },
      }
    console.log("123123", res)
    return res
    case 'POSTS_LOADING':
      return {
        ...state,
        feedLoading: {
          ...state.feedLoading,
          [action.payload]: true,
        },
        feedError: {
          ...state.feedError,
          [action.payload]: false,
        },
      }
    case 'POSTS_ERROR':
      return {
        ...state,
        feedLoading: {
          ...state.feedLoading,
          [action.payload]: false,
        },
        feedError: {
          ...state.feedError,
          [action.payload]: true,
        },
      }
    case 'COMMENTS_SUCCESS':
      const res2 = {
        ...state,
        comments: {
          ...state.comments,
          ...action.payload.reduce((accum, cur) => {
            accum[cur.id] = cur
            return accum
          }, {}),
        },
        commentsLoading: false,
        commentsError: false,
      }
      console.log("098890", res2)
      return res2
    case 'COMMENTS_LOADING':
      return {
        ...state,
        commentsLoading: true,
        commentsError: false,
      }
    case 'COMMENTS_ERROR':
      return {
        ...state,
        commentsLoading: false,
        commentsError: true,
      }
    case 'VENDOR_GROUPS_SUCCESS':
      const vendorGroupModified = action.payload.map(item => ({id: item.id, name: item.categoryName, vendorIds: []}))
      const vendorGroupMap = vendorGroupModified.reduce((accum, cur) => {
        accum[cur.id] = cur
        return accum
      }, {});
      // const vendorGroupMapWithVendorIds = {...vendorGroupMap, vendorIds: []}
      return {
        ...state,
        // vendorGroups: [...state.vendorGroups, ...action.payload],
        vendorGroups: {...state.vendorGroups, ...vendorGroupMap},
        vendorGroupsLoading: false,
        vendorGrouspError: false,
      }
    case 'VENDOR_GROUPS_LOADING':
      return {
        ...state,
        vendorGroupsLoading: true,
        vendorGrouspError: false,
      }
    case 'VENDOR_GROUPS_ERROR':
      return {
        ...state,
        vendorGroupsLoading: false,
        vendorGrouspError: true,
      }
    case 'VENDORS_BY_GROUP_SUCCESS':
      const vendorGroups = {
        ...state.vendorGroups,
        [action.payload.vendorGroupId]: {
          ...state.vendorGroups[action.payload.vendorGroupId],
          vendorIds: action.payload.vendors.map(item => item.id)
        }
      };
      const vendorMap = action.payload.vendors.reduce((accum, cur) => {
        accum[cur.id] = cur
        return accum
      }, {});
      console.log("THISW", vendorGroups, action.payload)
      return {
        ...state,
        vendorGroups,
        vendors: {...state.vendors, ...vendorMap},
        vendorGroupsLoading: false,
        vendorGrouspError: false,
      }
    // case 'GET_QUESTIONS':
    //   return {...state, questions: [...state.questions, action.payload]}
    // case 'GET_FOLLOWUPS':
    //   return {...state, followups: [...state.followups, action.payload]}
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        auth: action.payload.auth,
        users: {...state.users, [action.payload.user.id]: action.payload.user},
        authLoading: false,
        authError: false,
      }
    case 'LOGIN_LOADING':
      return {
        ...state,
        authLoading: true,
        authError: false,
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        authLoading: false,
        authError: true,
      }
    case 'USER_SUCCESS':
      return {
        ...state,
        users: {...state.users, [action.payload.username]: action.payload},
        userLoading: false,
        userError: false,
      }
    case 'USER_LOADING':
      return {
        ...state,
        userLoading: true,
        userError: false,
      }
    case 'USER_ERROR':
      return {
        ...state,
        userLoading: false,
        userError: true,
      }
    case 'POST_UPVOTE_SUCCESS':
      const post = state.posts[action.payload.postId];
      const up = action.payload.isUpvote ? post.numUpvotes + 1: post.numUpvotes;
      const down = action.payload.isUpvote ? post.numDownvotes : post.numDownvotes + 1;
      const userVote = action.payload.isUpvote ? post.userVote + 1 : post.userVote - 1;
      console.log("UV", post.userVote, userVote)
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]:
            {...state.posts[action.payload.postId],
              numUpvotes: up,
              numDownvotes: down,
              userVote,
            }
        }
      }
    case 'ONBOARDING_SUCCESS':
      return {
        ...state,
        industry: action.payload.industries.map(item => ({...item, name: item.industry_name})),
        categories: action.payload.subscriptionAreas.map(item => ({...item, name: item.category_name})),
        interests: action.payload.interestAreas.map(item => ({...item, name: item.interest_area_name})),
        // vendors: action.payload.vendors,
        onboardingLoading: false,
        onboardingError: false,
      }
    case 'ONBOARDING_LOADING':
      return {
        ...state,
        onboardingLoading: true,
        onboardingError: false,
      }
    case 'ONBOARDING_ERROR':
      return {
        ...state,
        onboardingLoading: false,
        onboardingError: true,
      }
    default:
      return state
  }
}


export function connect(mapStateToProps, mapDispatchToProps){
  const func = (Component) => {
    return (props) => {
      const store = useContext(ReduxContext);
      const [forcedUpdates, setForcedUpdates] = React.useState(0)
      const [, forceUpdate] = React.useReducer(s => s + 1, 0)

      React.useEffect(() => {
        const unsubscribe = store.subscribe(handleEvent)
        return () => {
          unsubscribe();
        }
      }, [])

      const handleEvent = () => {
        // setForcedUpdates(forcedUpdates => forcedUpdates + 1)
        forceUpdate()
      }
      return (<Component
        {...props}
        {...mapStateToProps(store.getState())}
        {...mapDispatchToProps(store.dispatch, store.getState)}
      />)
    };
  }
  return func;
}
