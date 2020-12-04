
import { saveComment, SAVE_COMMENT } from '../index';

// describe func/statement is to group together similar sets of tests to prevent DRY code
// first arg describes both the tests below, second arg func wraps both tests below

// making sure 'saveComment' action creator has a correct type & payload
describe('saveComment', () => {
  // we are going to call action creator & write expectations on action 

  test('has the correct type', () => {
    // calling action creator directly & saving inside a variable
    const action = saveComment(); 
    // adding type method on variable above 
    expect(action.type).toEqual(SAVE_COMMENT)
  })

  test('has the correct payload', () => {
    // pass in payload of some sort in action creator
    const action = saveComment('new comment'); // payload string object
    // adding payload method on variable above 
    expect(action.payload).toEqual('new comment') // comparing to a new value here
  })
})

// test for other action creators 
// describe('fetchComment', () => {
//   // we are going to call action creator & write expectations on action 
//   test('has the correct type', () => {
    
//   })

//   test('has the correct payload', () => {
//     // pass in payload of some sort
//   })
// })
