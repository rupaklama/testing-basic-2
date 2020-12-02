import React from 'react';
import { shallow } from 'enzyme';
import { testStore } from '../../testStore';

import CommentBox from '../CommentBox';

// we need to connect our test file to Redux store
// since this is a 'Connected component' which calls Action Creator
// to dispatch object/data to Redux Store

// NOTE: Passing 'store' as a prop to our Connect Component - CommentBox
// this is one of the recommended way
// setup function for dry with default initial state of this Test
const setup = (initialState = {}) => {
  // default initial state of our Test Redux Store
  const store = testStore(initialState); // passing default arg from above

  // dive meaning to get inside of children components
  // first Enzyme dive method returns/renders react child component of shallow wrapper
  // in our case, its going to return 'CommentBox' component wrapped with shallow wrapper below, now
  // to go one level deeper inside of CommentBox component to access 'html' elements,
  // we need to dive one more time, add one more dive()

  // NOTE: Enzyme suggests that first connect components to App Redux store &
  // then use dive methods to access its elements
  const wrapper = shallow(<CommentBox store={store} />).dive()
  // console.log(wrapper.debug());

  return wrapper;
};

// need to call setup for debugging in console
// setup();

// helper function for code reuse/DRY
// runs before each of our tests
// if there's a common code between multiple tests in a single file,
// we use jest's beforeEach helper func to extract that common logic
let wrapper;

beforeEach(() => {
  // any logic we put here gets executed before all the tests below
  // const initialState = { success: true }; NOTE: TO ADD INITIAL STATE FOR TEST
  wrapper = setup(); // wrapper = setup(initialState);
});

test('has a text area and a button', () => {
  // console.log(wrapper.find("textarea").length);
  // console.log(wrapper.find("button").length);
  expect(wrapper.find('textarea').length).toBe(1);
  expect(wrapper.find('button').length).toBe(1);
});

// following Steps of Simulating/Faking Events
// 1. Find the textarea element - wrapper.find('textarea')
// 2. Simulate/fake a 'change' event - .simulate(event,[mock]) method of enzyme
// simulate(event,[mock]) method - first arg is html DOM event & second arg [mock] is fake event object
// 3. Provide html DOM event & mock event object 'e.target.value' in simulate method
// 4. Force the component to re-render -  to avoid
//    default behaviour of react where react does it asynchronously taking some time to re-render,
//    we can use enzyme's 'update()' func to re-render right away after we update component's state
// 5. Expectation - Assert that text areas value has changed

// making sure the text input is working & storing input values
test('has a text area that users can type in', () => {
  // simulate takes first arg -  html name of the DOM event
  // Second arg is the mock event object that will be merged with the event object - (e)
  // & passed to our event handlers - handleChange = e => {}
  wrapper
    .find('textarea')
    // second arg - mock event object 'e.target.value' in simulate method
    .simulate('change', { target: { value: 'new comment' } }); // Creating state object - with mock event & value

  // Forcing the component to re-render when comment state gets updated with our mock event object above
  // to mock default behaviour of react to update state with new data
  wrapper.update();

  // assertion that text area got our new value/state - 'new comment'
  // .prop(key) allows us to access props passed into any element into
  // our react components like value={}, onChange={}, onSubmit={}
  expect(wrapper.find('textarea').prop('value')) // value attribute in <textarea />
    .toBe('new comment');
});

// we need to make sure text area has some text inside of it.
// If we submit a form without a text in it, we are not doing a very good test.
// So, we will add string value of 'new comment' in our text area element
// mocking the form - pretending that the text - 'new comment' is inside of text area element
// to submit a form with a text

// we need to simulate 'submit event' on the form itself
test('when form is submitted, text area gets emptied', () => {
  wrapper
    .find('textarea')
    // mock/fake event object of 'e.target.value' which sets our comment state with value - 'new comment'
    .simulate('change', { target: { value: 'new comment' } });

  // forcing our component to update right away to apply new state of 'new comment'
  wrapper.update();

  expect(wrapper.find('textarea').prop('value')) // value attribute in <textarea />
    .toBe('new comment');

  // now making attempt to Submit the form itself to verify if textarea gets emptied out after submitting
  // When we simulate event, we use normal 'html name' of the event
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  // ADD { preventDefault: () => {},} as a second arg in simulate func to mock e.preventDefault()
  // & to avoid undefined issue with Shallow render
  // type error: cannot read property 'preventdefault' of undefined
  // To mock, e.preventDefault()
  // NOTE - this is an issue only when using shallow enzyme renderer.
  // In case of full DOM renderer mount, the event object contains the preventDefault method, therefore you don't have to mock it.

  // when we submit the form, it will call - handleSubmit func
  // which will change our state value to empty string by calling setComment('') to clear the form values
  // setComment('') is a async operation, so we need to force our component to update
  // in order to change our state value to initial state of '' after submitting form
  // forcing our component to update right away to update comment state to '' - initial state
  wrapper.update();

  // comment state to be empty string - const [comment, setComment] = useState('');
  expect(wrapper.find('textarea').prop('value')).toBe('');
});
