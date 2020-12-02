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
  // first arg - initial state of our reducer, second arg - fake action object
  const newState = commentsReducer([], action) // assigning reducer state to a variable

  // now, [] - initial state above should have above payload - fake action object 
  // Now, comparing our reducer state with an array of same value
  expect(newState).toEqual(['New Comment from fake action'])
})
