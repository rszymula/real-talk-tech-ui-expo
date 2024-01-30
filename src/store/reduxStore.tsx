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

export function reducer(state = {count: 0}, action){
  console.log("R1", state)
  switch(action.type){
    case 'INCREMENT':
      return {...state, count: state.count + 1}
    case 'DECREMENT':
      return {...state, count: state.count - 1}
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
