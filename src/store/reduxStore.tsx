import React, { useContext } from 'react';

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
  users: [],
  usersLoading: false,
  usersError: null,
  posts: [],
  postsLoading: false,
  postsError: null,
  comments: [],
  commentsLoading: false,
  commentsError: null,
  companies: [],
  companiesLoading: false,
  companiesError: null,
  // questions: [],
  // usersLoading: false,
  // usersError: null,
  // followups: [],
  // usersLoading: false,
  // usersError: null,
}

export function reducer(state = initialState, action){
  console.log("R1", state)
  switch(action.type){
    case 'GET_POSTS':
      return {...state, posts: [...state.posts, action.payload]}
    case 'GET_COMMENTS':
      return {...state, comments: [...state.comments, action.payload]}
    case 'GET_COMPANIES':
      return {...state, companies: [...state.companies, action.payload]}
    // case 'GET_QUESTIONS':
    //   return {...state, questions: [...state.questions, action.payload]}
    // case 'GET_FOLLOWUPS':
    //   return {...state, followups: [...state.followups, action.payload]}
    default:
      return state
  }
}


export function connect(mapStateToProps, mapDispatchToProps){
  const func = (Component) => {
    return (props) => {
      const store = useContext(ReduxContext);

      console.log("A1", store, store.getState())

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
