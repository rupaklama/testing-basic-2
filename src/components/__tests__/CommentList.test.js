import React from 'react';
import { shallow } from 'enzyme';

import { testStore } from '../../testStore';
import CommentList from '../CommentList';

// NOTE: Avoid using 'redux-mock-store'
// Because if your reducers fails, the mock-store method will not catch it.
// Instead use Real Redux Store. Your reducer automatically gets initialized with the correct initial state.

// NOTE: Passing 'store' as a prop to our Connect Component - CommentBox
// this is one of the recommended way
// setup function for dry with default initial state of this Test if not provided
const setup = (initialState = {}) => {
  // default initial state of our Test Redux Store
  const store = testStore(initialState); // passing default arg from above

  // dive meaning to get inside of children components
  // first Enzyme dive method returns/renders react child component of shallow wrapper
  // in our case, its going to return 'CommentBox' component wrapped with shallow wrapper below, now
  // to go one level deeper inside of CommentBox component to access 'html' elements,
  // we need to dive one more time, add one more dive()

  // NOTE: Enzyme suggests that first connect components to App Redux store &
  // then use dive methods to access its elements when using 'shallow' rendering
  const wrapper = shallow(<CommentList store={store} />).dive().dive()
  // console.log(wrapper.debug());

  return wrapper;
};

// helper function for code reuse/DRY
// runs before each of our tests
// if there's a common code between multiple tests in a single file,
// we use jest's beforeEach helper func to extract that common logic
let wrapper;

beforeEach(() => {
  // our test files don't have any way to modify data inside Redux store
  // We need to somehow pass some data into our Redux Store, so
  // that it can be share with <CommentList />
  // To make it happen, we need to Customize our Redux Store to pass some initial test state 
  // Good approach is to create initial test state for this test file
  const initialState = {
    comments: ['Comment 1', 'Comment 2']
  }

  // any logic we put here gets executed before all the tests below
  // const initialState = { success: true }; NOTE: TO ADD INITIAL STATE FOR TEST
  wrapper = setup(initialState); // wrapper = setup(initialState);
});


// to display each comment with 'li' element
test('creates one List element per comment', () => {
  // two comments in initialState array, should return 2
  // console.log(wrapper.find('li').length)
  expect(wrapper.find('li').length).toBe(2); // 2 elements in array
});

// this test is to find bugs while rendering comments
// enzyme recommended way is to use `render()` method to test `HTML output` of the component
// render method returns CheerioWrapper
// CheerioWrapper is a library like jQuery allows us to run queries over snippets of html
test('shows the correct text for each comment', () => {
  // prints out all the text render by CommentList.test file from our initial state
  // console.log(wrapper.render().text())
  // to make sure our comments get display as it is 
  expect(wrapper.render().text()).toContain('Comment 1')
  expect(wrapper.render().text()).toContain('Comment 2')
})
