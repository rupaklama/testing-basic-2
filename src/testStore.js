// to connect test files that have Connected Components to Redux Store
import { createStore, applyMiddleware } from 'redux';

// all our app reducers
import rootReducers from './reducers';

// all our middlewares from main redux store
import { middleware } from './store';

// param - to specify initial state in our test store
export const testStore = (initialState) => {
  // we want to create a TEST STORE for testing that matches configuration of our actual Redux Store
  // which uses Reducers & middlewares from our actual App
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
  return createStoreWithMiddleware(rootReducers, initialState)
}

// NOTE: This 'testStore' helper func will be added as a PROP to our Connected Components
// in our test files which allow Connected Components to connect to our Redux Store
