import React from 'react';

// Shallow render method only renders just the give component with its 
// inner contents like div, text, input etc 
// but none of its react Children Component will render
import { shallow } from 'enzyme';

import App from '../App';
import CommentBox from '../CommentBox';
import CommentList from '../CommentList';


// if there's a common code between multiple tests in a single file,
// we use jest's beforeEach helper func to extract that common logic
let wrapper; // let to reassigned new values to this variable several times during test
beforeEach(() => {
  // any logic we put here gets executed before all the tests below
  wrapper = shallow(<App />)
});

// first arg - String description of the test, second arg - func with test logic
// reading this test as - test 'shows one CommentBox component' for making meaningful description
test('shows one CommentBox component', () => {
  // using Shallow render method of enzyme to render only App component
  // wrapper - a shallow instance object we get from this is a wrapped version of App component
  // wrapper specifically means that this is a wrapped component that has some additional 
  // functionalities loaded on top with Enzyme

  // to find CommentBox component inside of our wrapped App component
  // find method returns back an array which contains every instances of CommentBox that was found
  // although we only care about one copy of CommentBox that was created
  // NOTE: with Find method, we can return React Components & HTML elements
  expect(wrapper.find(CommentBox).length).toBe(1);
})

test('shows one CommentList component', () => {
  expect(wrapper.find(CommentList).length).toBe(1);
})
