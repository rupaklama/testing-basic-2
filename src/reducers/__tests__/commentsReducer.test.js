import { SAVE_COMMENT } from '../../actions';
import commentsReducer from '../commentsReducer';


// To test Reducers, all we have to do call Reducer, pass in some fake Action object &
// make expectation around the value that Reducer returns
test('handles actions of type `SAVE_COMMENT`', () => {
  // don't need to call APP Action creator here
  // Creating fake Action object to pass in our Reducer
  const action = {
    type: SAVE_COMMENT,
    payload: 'New Comment from fake action'
  }

  // Calling our reducer to process fake action object
  // first arg - same initial state of our reducer, second arg - fake action object
  // assigning reducer state to a variable & fake action object
  const newState = commentsReducer([], action) 

  // now, [] - initial state above should have above payload - fake action object 
  // Now, comparing our reducer state with new array of same value
  expect(newState).toEqual(['New Comment from fake action'])
})

// our reducer does not throw an error if it gets an action of unknown type
test('handles action with unknown type', () => {
  // call our reducer & pass in empty object
  // empty object is same as action object with unknown type,
  // {} OR { type: 'adffddfd' }, same thing
  const newState = commentsReducer([], {})

  // don't throw any error, just return empty array - initial state
  expect(newState).toEqual([])
})
