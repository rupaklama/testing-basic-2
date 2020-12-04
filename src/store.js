// creating separate file to access Redux Store in test files
import React from 'react';

// provider component to share data
import { Provider } from 'react-redux';

// Using other function from Redux - createStore ()
// to put all Reducers into the Redux Store object & create Global State object
// applyMiddleware - to add redux thunk
import { createStore, applyMiddleware } from 'redux';

// redux promise to make async network request
import thunk from 'redux-thunk';

// redux dev tool
import { composeWithDevTools } from 'redux-devtools-extension';

// import root reducer
import rootReducer from './reducers';

// to add multiple middleware here
export const middleware = [thunk];

// This is a React Provider component & call with props object
// This component will wrap up other components

const store = ({ children, initialState = {} }) => {
  // Wrap the children component with the Provider component.
  // pass in a single prop - store which takes in all the reducers
  return (
    <Provider
      store={createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
      )}
    >
      {children}
    </Provider>
  );
};

export default store;

// createStore expects to receive the following arguments
// 1. reducer (Function)
// 2. The initial state
// 3. [enhancer] (Function): The store enhancer. You may optionally specify it to
// enhance the store with third-party capabilities such as middleware, time travel, persistence, etc.
// The only store enhancer that ships with Redux is applyMiddleware()
