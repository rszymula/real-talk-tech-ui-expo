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

// export function reducerCount(state = {count: 0}, action){
//   switch(action.type){
//     case 'INCREMENT':
//       return {count: state.count + 1}
//     case 'DECREMENT':
//       return {count: state.count - 1}
//     default:
//       return {}
//   }
// }

const initialState = {
  industry: [], // What industry are you in?
  categories, // What do you do?
  interests: [], // What software / tech interests you?
  auth: {
    userId: -1,
    token: "",
  },
  users: [],
  userLoading: false,
  userError: null,
  feed: Object.values(CategoryNames).filter(item => isNaN(Number(item))).reduce((acc, item) => (acc[item] = [], acc), {}),
  posts: {},
  feedLoading: {},
  feedError: {},
  comments: [],
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
  vendors: [{id: 1, name: "Asana"}, {id: 2, name: "Square"}],
  vendorsLoading: false,
  vendorsError: null,
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
      return {
        ...state,
        feed: {
          ...state.feed,
          [action.payload.category]:[
            ...state.feed[action.payload.category],
            ...action.payload.data// .map(item => item.id)
          ]
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
    case 'POSTS_LOADING':
      // console.log("FZZZ", action.payload)
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
      return {
        ...state,
        comments: [...state.comments, ...action.payload],
        commentsLoading: false,
        commentsError: false,
      }
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
    case 'VENDORS_SUCCESS':
      return {
        ...state,
        vendors: [...state.vendors, ...action.payload],
        vendorsLoading: false,
        vendorsError: false,
      }
    case 'VENDORS_LOADING':
      return {
        ...state,
        vendorsLoading: true,
        vendorsError: false,
      }
    case 'VENDORS_ERROR':
      return {
        ...state,
        vendorsLoading: false,
        vendorsError: true,
      }
    // case 'GET_QUESTIONS':
    //   return {...state, questions: [...state.questions, action.payload]}
    // case 'GET_FOLLOWUPS':
    //   return {...state, followups: [...state.followups, action.payload]}
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        auth: action.payload,
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
    default:
      return state
  }
}


export function connect(mapStateToProps, mapDispatchToProps){
  const func = (Component) => {
    return (props) => {
      const store = useContext(ReduxContext);

      // console.log("A1", store, store.getState())

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
        {...mapDispatchToProps(store.dispatch)}
      />)
    };
  }
  return func;
}
